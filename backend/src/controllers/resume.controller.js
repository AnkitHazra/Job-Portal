import User from '../models/user.model.js';
import axios from 'axios';
import pdfParse from 'pdf-parse-fork';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Common keywords for different job roles
const jobKeywords = {
  'Software Developer': [
    'JavaScript', 'Python', 'React', 'Node.js', 'MongoDB', 'SQL',
    'Git', 'Docker', 'AWS', 'TypeScript', 'REST API', 'Agile',
    'HTML', 'CSS', 'Git', 'Linux', 'CI/CD', 'Testing'
  ],
  'Data Analyst': [
    'Python', 'SQL', 'Excel', 'Tableau', 'Power BI', 'Statistics',
    'Machine Learning', 'R', 'Data Visualization', 'Pandas', 'NumPy',
    'Data Mining', 'ETL', 'Reporting', 'Analytics'
  ],
  'Marketing Manager': [
    'SEO', 'SEM', 'Social Media', 'Content Marketing', 'Analytics',
    'Brand Management', 'Campaign', 'Digital Marketing', 'PPC',
    'Email Marketing', 'Marketing Strategy', 'Google Analytics'
  ],
  'HR Manager': [
    'Recruitment', 'Onboarding', 'Employee Relations', 'Payroll',
    'Performance Management', 'HRIS', 'Compliance', 'Training',
    'Talent Acquisition', 'Workforce Planning', 'Benefits'
  ],
  'Project Manager': [
    'Agile', 'Scrum', 'Project Planning', 'Risk Management',
    'Stakeholder', 'Budget', 'Timeline', 'JIRA', 'Confluence',
    'Team Leadership', 'Resource Management', 'Kanban'
  ],
  'Business Analyst': [
    'Requirements', 'Stakeholder', 'Process Improvement', 'Data Analysis',
    'Documentation', 'UAT', 'User Stories', 'Business Case', 'ROI',
    'Workflow', 'Gap Analysis', 'Functional Specifications'
  ],
  'UX Designer': [
    'Figma', 'Sketch', 'User Research', 'Wireframing', 'Prototyping',
    'Usability Testing', 'Adobe XD', 'Information Architecture',
    'Design Thinking', 'User Personas', 'A/B Testing', 'Interaction Design'
  ],
  'DevOps Engineer': [
    'Docker', 'Kubernetes', 'Jenkins', 'CI/CD', 'AWS', 'Azure',
    'Terraform', 'Ansible', 'Linux', 'Bash', 'Python', 'Monitoring',
    'Git', 'Infrastructure', 'Cloud', 'Automation'
  ]
};

// Extract text from Cloudinary URL
const extractTextFromUrl = async (fileUrl) => {
  try {
    console.log('📄 Fetching resume from URL:', fileUrl);
    
    if (!fileUrl || (!fileUrl.startsWith('http://') && !fileUrl.startsWith('https://'))) {
      throw new Error(`Invalid URL: ${fileUrl}`);
    }
    
    const response = await axios.get(fileUrl, {
      responseType: 'arraybuffer',
      timeout: 15000,
      headers: {
        'Accept': 'application/pdf, application/octet-stream'
      }
    });
    
    const bufferSize = response.data.length || response.data.byteLength;
    console.log('✅ File fetched successfully, size:', bufferSize, 'bytes');
    
    const data = await pdfParse(Buffer.from(response.data));
    
    console.log('✅ PDF parsed successfully, text length:', data.text.length, 'characters');
    
    return data.text;
  } catch (error) {
    console.log('❌ Error extracting text:', error.message);
    if (error.message.includes('Invalid URL')) {
      throw error;
    }
    throw new Error('Could not read your resume file. Please ensure it is a valid PDF.');
  }
};

// Function to calculate ATS score
const calculateATSScore = (text, jobTitle) => {
  const result = {
    score: 0,
    keywordMatch: 0,
    formatScore: 0,
    skillsMatch: 0,
    experienceScore: 0,
    educationScore: 0,
    suggestions: [],
    keywords: []
  };

  // 1. Keywords Analysis (40%)
  const keywords = jobKeywords[jobTitle] || [
    'JavaScript', 'Python', 'React', 'Node.js', 'MongoDB', 'SQL',
    'Communication', 'Teamwork', 'Leadership', 'Problem Solving'
  ];
  
  let keywordsFound = [];
  keywords.forEach(keyword => {
    if (text.toLowerCase().includes(keyword.toLowerCase())) {
      keywordsFound.push(keyword);
    }
  });
  
  result.keywordMatch = Math.round((keywordsFound.length / keywords.length) * 40);
  result.keywords = keywordsFound;

  // 2. Format Analysis (20%)
  let formatScore = 0;
  if (text.toLowerCase().includes('experience') || text.toLowerCase().includes('work')) formatScore += 5;
  if (text.toLowerCase().includes('education')) formatScore += 5;
  if (text.toLowerCase().includes('skills')) formatScore += 5;
  if (text.toLowerCase().includes('summary') || text.toLowerCase().includes('objective')) formatScore += 5;
  result.formatScore = formatScore;

  // 3. Skills Analysis (20%)
  const technicalSkills = [
    'programming', 'development', 'analysis', 'management',
    'database', 'cloud', 'testing', 'deployment', 'design',
    'architecture', 'debugging', 'optimization'
  ];
  
  let skillsFound = 0;
  technicalSkills.forEach(skill => {
    if (text.toLowerCase().includes(skill)) skillsFound++;
  });
  result.skillsMatch = Math.round((skillsFound / technicalSkills.length) * 20);

  // 4. Experience Analysis (10%)
  const experiencePatterns = [
    /\d+\+?\s*years?\s*(of)?\s*experience/i,
    /\d+\s*-\s*\d+\s*years/i,
    /experience\s*:\s*\d+\s*years/i,
    /worked\s*for\s*\d+\s*years/i
  ];
  
  let experienceFound = false;
  experiencePatterns.forEach(pattern => {
    if (pattern.test(text)) experienceFound = true;
  });
  result.experienceScore = experienceFound ? 10 : 5;

  // 5. Education Analysis (10%)
  const educationKeywords = [
    'bachelor', 'master', 'phd', 'degree', 'university',
    'college', 'institute', 'school', 'certification', 'diploma'
  ];
  
  let educationFound = 0;
  educationKeywords.forEach(edu => {
    if (text.toLowerCase().includes(edu)) educationFound++;
  });
  result.educationScore = Math.min(10, educationFound * 2);

  // Calculate total score
  result.score = 
    result.keywordMatch +
    result.formatScore +
    result.skillsMatch +
    result.experienceScore +
    result.educationScore;

  // Generate suggestions
  if (result.keywordMatch < 25) {
    result.suggestions.push('Add more relevant keywords related to the job position');
  }
  if (result.formatScore < 15) {
    result.suggestions.push('Include clear sections: Experience, Education, Skills, and Summary');
  }
  if (result.skillsMatch < 15) {
    result.suggestions.push('Highlight your technical and soft skills more prominently');
  }
  if (!experienceFound) {
    result.suggestions.push('Specify years of experience for each role');
  }
  if (result.educationScore < 5) {
    result.suggestions.push('Include your educational qualifications and certifications');
  }
  if (text.split(' ').length < 200) {
    result.suggestions.push('Your resume seems short. Aim for 300-500 words for better ATS performance');
  }

  return result;
};

// ✅ AI-Powered Suggestions using Gemini (Fixed Model Name)
const getAISuggestions = async (resumeText, atsScore, keywordsFound, jobTitle) => {
  try {
    console.log('🤖 Requesting AI suggestions from Gemini...');
    
    // Check if API key is configured
    if (!process.env.GEMINI_API_KEY) {
      console.log('⚠️ No Gemini API key found, using fallback');
      return getFallbackSuggestions(jobTitle, atsScore);
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    
    // ✅ FIXED: Use gemini-1.5-flash (free, fast, and available)
    const model = genAI.getGenerativeModel({ model: 'gemini-3.1-flash-lite' });

    const prompt = `Analyze this resume for a ${jobTitle} position. ATS Score: ${atsScore}/100. Keywords found: ${keywordsFound.join(', ')}.

Resume text:
${resumeText.substring(0, 3000)}

Return ONLY a JSON object (no markdown, no code blocks) with this structure:
{
  "summary": "2-3 sentence assessment of the resume",
  "strengths": ["strength 1", "strength 2", "strength 3"],
  "weaknesses": ["weakness 1", "weakness 2", "weakness 3"],
  "improvementTips": ["tip 1", "tip 2", "tip 3", "tip 4"],
  "recommendedJobs": [
    {"title": "Job Title 1", "reason": "why it fits", "matchPercentage": 85},
    {"title": "Job Title 2", "reason": "why it fits", "matchPercentage": 75},
    {"title": "Job Title 3", "reason": "why it fits", "matchPercentage": 65}
  ],
  "skillsToAdd": ["skill 1", "skill 2", "skill 3"],
  "certificationsRecommended": ["certification 1", "certification 2"],
  "resumeFormatSuggestions": "brief formatting advice"
}`;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    
    console.log('✅ AI raw response received');
    console.log('First 200 chars:', text.substring(0, 200));
    
    // Clean the response - remove markdown code blocks
    let cleanedText = text
      .replace(/```json\n?/g, '')
      .replace(/```\n?/g, '')
      .replace(/```/g, '')
      .trim();
    
    // Try to find JSON object in the response
    const jsonMatch = cleanedText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      cleanedText = jsonMatch[0];
    }
    
    try {
      const parsed = JSON.parse(cleanedText);
      console.log('✅ Successfully parsed AI response');
      console.log('Keys received:', Object.keys(parsed));
      return parsed;
    } catch (parseError) {
      console.log('⚠️ JSON parse error:', parseError.message);
      console.log('Cleaned text:', cleanedText.substring(0, 300));
      return getFallbackSuggestions(jobTitle, atsScore);
    }
  } catch (error) {
    console.log('❌ AI error:', error.message);
    
    // If model not found, try alternative model name
    if (error.message.includes('not found')) {
      console.log('🔄 Trying alternative model...');
      try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: 'gemini-3.1-flash-lite' });
        const result = await model.generateContent(prompt);
        const text = result.response.text();
        // ... same parsing logic
      } catch (retryError) {
        console.log('❌ Retry also failed:', retryError.message);
      }
    }
    
    return getFallbackSuggestions(jobTitle, atsScore);
  }
};

// Fallback suggestions if AI fails
const getFallbackSuggestions = (jobTitle, atsScore) => {
  const jobSpecificTips = {
    'Software Developer': {
      strengths: ['Technical skills present in resume', 'Relevant experience detected'],
      weaknesses: ['Could improve keyword optimization', 'Format needs improvement'],
      improvementTips: [
        'Add specific technologies and frameworks you have worked with',
        'Include links to your GitHub or portfolio projects',
        'Quantify your achievements with metrics and numbers',
        'Add a technical skills section with proficiency levels'
      ],
      recommendedJobs: [
        { title: 'Junior Software Developer', reason: 'Good starting point to build experience', matchPercentage: 80 },
        { title: 'Full Stack Developer', reason: 'Skills align with full stack requirements', matchPercentage: 70 },
        { title: 'Frontend Developer', reason: 'Frontend skills detected in resume', matchPercentage: 65 }
      ],
      skillsToAdd: ['System Design', 'Cloud Services (AWS/GCP)', 'Testing Frameworks'],
      certificationsRecommended: ['AWS Certified Developer', 'Google Cloud Professional Developer'],
      resumeFormatSuggestions: 'Use a clean single-column layout with clear section headers'
    },
    'Data Analyst': {
      strengths: ['Analytical skills present', 'Tool experience mentioned'],
      weaknesses: ['Missing statistical background details', 'Limited project examples'],
      improvementTips: [
        'Highlight specific data analysis tools you have used',
        'Include examples of data-driven decisions you made',
        'Mention any dashboard or visualization work',
        'Add relevant coursework or training'
      ],
      recommendedJobs: [
        { title: 'Junior Data Analyst', reason: 'Entry-level position matching current skills', matchPercentage: 82 },
        { title: 'Business Intelligence Analyst', reason: 'Data skills align with BI requirements', matchPercentage: 72 },
        { title: 'Data Visualization Specialist', reason: 'Potential fit based on skills', matchPercentage: 65 }
      ],
      skillsToAdd: ['Machine Learning Basics', 'Advanced Excel', 'Data Warehousing'],
      certificationsRecommended: ['Google Data Analytics Certificate', 'Microsoft Data Analyst Associate'],
      resumeFormatSuggestions: 'Include a portfolio section with data projects and visualizations'
    }
  };

  const defaultFallback = {
    summary: `Your resume scored ${atsScore}/100 on the ATS analysis. There is room for improvement to make it more competitive.`,
    strengths: ['Relevant experience present', 'Some industry keywords found', 'Basic resume structure detected'],
    weaknesses: ['Keyword optimization needed', 'Missing quantifiable achievements', 'Format could be improved'],
    improvementTips: [
      'Tailor your resume specifically for each job application',
      'Add measurable achievements with numbers and percentages',
      'Use industry-standard keywords from job descriptions',
      'Ensure your resume has clear sections with proper headings'
    ],
    recommendedJobs: [
      { title: `${jobTitle}`, reason: 'Your target role - optimize resume for this position', matchPercentage: atsScore },
      { title: `Junior ${jobTitle}`, reason: 'Consider entry-level positions to gain experience', matchPercentage: atsScore + 10 },
      { title: `Associate ${jobTitle}`, reason: 'Another pathway into the field', matchPercentage: atsScore + 5 }
    ],
    skillsToAdd: ['Project Management', 'Communication', 'Problem Solving'],
    certificationsRecommended: ['Relevant industry certification', 'Online course completion certificate'],
    resumeFormatSuggestions: 'Keep resume to 1-2 pages with consistent formatting and bullet points'
  };

  return jobSpecificTips[jobTitle] || defaultFallback;
};

// @desc    Analyze user's existing resume from Cloudinary
// @route   POST /api/resume/analyze-existing
export const analyzeExistingResume = async (req, res) => {
  try {
    const { jobTitle } = req.body;
    
    if (!jobTitle) {
      return res.status(400).json({ message: 'Please provide a target job title' });
    }

    const user = await User.findById(req.user._id);

    if (!user || !user.resumeUrl) {
      return res.status(400).json({ 
        message: 'No resume found. Please upload your resume first in Profile settings.' 
      });
    }

    console.log('📋 Analyzing resume for user:', user.email);
    console.log('📎 Resume URL:', user.resumeUrl);
    console.log('🎯 Target job title:', jobTitle);

    let text;
    try {
      text = await extractTextFromUrl(user.resumeUrl);
    } catch (error) {
      return res.status(400).json({ 
        message: error.message || 'Could not read your resume file.' 
      });
    }

    if (!text || text.trim().length === 0) {
      return res.status(400).json({ 
        message: 'Could not extract text from your resume.' 
      });
    }

    console.log('📝 Extracted text length:', text.length, 'characters');

    // Calculate ATS score
    const analysis = calculateATSScore(text, jobTitle);
    
    console.log('📊 ATS Score:', analysis.score);
    console.log('🔑 Keywords found:', analysis.keywords.length);

    // ✅ Get AI suggestions
    const aiSuggestions = await getAISuggestions(
      text, 
      analysis.score, 
      analysis.keywords, 
      jobTitle
    );  

    // Update user with ATS data and AI suggestions
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        $set: {
          atsScore: analysis.score,
          atsAnalysis: {
            keywordMatch: analysis.keywordMatch,
            formatScore: analysis.formatScore,
            skillsMatch: analysis.skillsMatch,
            experienceScore: analysis.experienceScore,
            educationScore: analysis.educationScore
          },
          atsSuggestions: analysis.suggestions,
          atsKeywords: analysis.keywords,
          atsJobTitle: jobTitle,
          atsAnalyzedAt: new Date(),
          // ✅ Store AI suggestions
          aiSuggestions: aiSuggestions
        }
      },
      { returnDocument:'after'}
    );

    res.status(200).json({
      message: 'Resume analyzed successfully',
      resume: {
        atsScore: updatedUser.atsScore,
        analysis: updatedUser.atsAnalysis,
        suggestions: updatedUser.atsSuggestions,
        keywords: updatedUser.atsKeywords,
        atsJobTitle: updatedUser.atsJobTitle,
        resumeUrl: updatedUser.resumeUrl,
        aiSuggestions: updatedUser.aiSuggestions
      }
    });
  } catch (error) {
    console.log('❌ Analyze error:', error);
    res.status(500).json({ message: 'Server error analyzing resume.' });
  }
};

// @desc    Get ATS analysis data
// @route   GET /api/resume/ats-data
export const getATSData = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      atsScore: user.atsScore || 0,
      atsAnalysis: user.atsAnalysis || {
        keywordMatch: 0,
        formatScore: 0,
        skillsMatch: 0,
        experienceScore: 0,
        educationScore: 0
      },
      atsSuggestions: user.atsSuggestions || [],
      atsKeywords: user.atsKeywords || [],
      atsJobTitle: user.atsJobTitle || '',
      atsAnalyzedAt: user.atsAnalyzedAt || null,
      hasResume: !!user.resumeUrl,
      resumeUrl: user.resumeUrl || '',
      aiSuggestions: user.aiSuggestions || null
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error' });
  }
};