import React, { useState, useMemo, useEffect, useRef, createContext, useContext } from 'react';
import { ExternalLink } from 'lucide-react';

// ===== i18n TRANSLATIONS =====
const translations = {
  ko: {
    // Navigation
    nav: {
      overview: "Overview",
      narrative: "내러티브",
      talents: "재능 분석",
      skills: "보유 기술",
      positions: "직무 적합도",
      jdAnalysis: "JD 분석",
      contact: "연락하기"
    },
    // Profile
    profile: {
      name: "최홍익 (Max Choi)",
      tagline: "Gaming PM → Finance Transformation | 7+ yrs Global Career",
      summary: [
        "7년 이상 글로벌 게임 산업에 종사하며, 5년 이상 사업 프로젝트 매니저로 활동했습니다. PURPLE 플랫폼 38개국 론칭($3M+ 규모)을 리딩하고, Amazon Games M&A 딜(쓰론앤리버티)을 지원했으며, 전사 개발 효율화 파일럿을 지원(예. 글로벌 아트 리더, CBT 절차 도입, 빌드 테스트 룸 설치 등) 했습니다.",
        "현재 University of Illinois at Urbana-Champaign MSA(회계학 석사) 과정 중이며, Big 4 Advisory 및 FP&A 역할을 목표로 커리어 전환을 준비하고 있습니다. 장기적으로는 비즈니스 전반(Wide)과 회계/재무/세무 전문성(Deep)을 아우르는 M자형 인재로서 글로벌 비즈니스 성공을 지원하고자 합니다."
      ]
    },
    // Sections
    sections: {
      achievements: "주요 성과",
      experience: "경력 사항",
      education: "학력",
      certifications: "자격증",
      talentAnalysis: "재능 분석",
      talentDesc: "대화 내역과 이력서 문서에서 추출한 역량 종합 분석",
      skills: "보유 기술",
      skillsDesc: "기술 • 카테고리",
      narrative: "커리어 내러티브",
      narrativeDesc: "왜 이 여정을 걸어왔는지, 그리고 어디로 향하는지",
      positions: "직무별 적합도",
      positionsDesc: "목표 직무와 현재 역량의 매칭 분석",
      contact: "연락하기",
      contactDesc: "궁금한 점이나 협업 제안이 있으시면 연락 주세요"
    },
    // Labels
    labels: {
      globalLaunch: "글로벌 론칭",
      preRegistration: "사전예약 (글로벌 누적)",
      projectScale: "프로젝트 규모",
      stakeholders: "이해관계자",
      timeSaved: "팀 업무시간 절감",
      clickForDetails: "클릭하여 상세보기 →",
      close: "닫기",
      search: "검색...",
      reset: "초기화",
      conversationOnly: "대화에서만",
      intersection: "교집합 (핵심)",
      resumeOnly: "이력서에서만",
      methodology: "방법론",
      methodologyDesc: "데이터 수집 및 분석 방법"
    },
    // Experience
    experience: {
      pdmo: "IT Project Manager - PDMO",
      bizPm: "Business PM - PURPLE",
      pm: "Project Manager"
    },
    // Footer
    footer: {
      builtWith: "Built with 💙 by"
    }
  },
  en: {
    // Navigation
    nav: {
      overview: "Overview",
      narrative: "Narrative",
      talents: "Talent Analysis",
      skills: "Skills",
      positions: "Job Fit",
      jdAnalysis: "JD Analysis",
      contact: "Contact"
    },
    // Profile
    profile: {
      name: "Hongik (Max) Choi",
      tagline: "Gaming PM → Finance Transformation | 7+ yrs Global Career",
      summary: [
        "7+ years in the global gaming industry, with 5+ years as a Business Project Manager. Led PURPLE platform launches across 38 countries ($3M+ scale), supported Amazon Games M&A deal (Throne and Liberty), and managed company-wide development efficiency pilots (Global Art Leader).",
        "Currently pursuing MSA (Master of Accountancy) at University of Illinois at Urbana-Champaign, preparing for a career transition targeting Big 4 Advisory and FP&A roles. Long-term, I aspire to become an M-shaped talent bridging broad business acumen (Wide) with deep expertise in accounting/finance/tax (Deep) to support global business success."
      ]
    },
    // Sections
    sections: {
      achievements: "Key Achievements",
      experience: "Experience",
      education: "Education",
      certifications: "Certifications",
      talentAnalysis: "Talent Analysis",
      talentDesc: "Comprehensive competency analysis extracted from conversations and resume documents",
      skills: "Skills",
      skillsDesc: "skills • categories",
      narrative: "Career Narrative",
      narrativeDesc: "Why I've walked this path, and where I'm heading",
      positions: "Job Fit Analysis",
      positionsDesc: "Matching analysis between target roles and current competencies",
      contact: "Contact",
      contactDesc: "Feel free to reach out for inquiries or collaboration"
    },
    // Labels
    labels: {
      globalLaunch: "Global Launch",
      preRegistration: "Pre-registrations (Global)",
      projectScale: "Project Scale",
      stakeholders: "Stakeholders",
      timeSaved: "Team Hours Saved",
      clickForDetails: "Click for details →",
      close: "Close",
      search: "Search...",
      reset: "Reset",
      conversationOnly: "Conversation Only",
      intersection: "Intersection (Core)",
      resumeOnly: "Resume Only",
      methodology: "Methodology",
      methodologyDesc: "Data collection and analysis methods"
    },
    // Experience
    experience: {
      pdmo: "IT Project Manager - PDMO",
      bizPm: "Business PM - PURPLE",
      pm: "Project Manager"
    },
    // Footer
    footer: {
      builtWith: "Built with 💙 by"
    }
  }
};

// Language Context
const LanguageContext = createContext();
const useLanguage = () => useContext(LanguageContext);

// ===== DATA =====
const profileData = {
  name: "최홍익 (Max Choi)",
  tagline: "Gaming PM → Finance Transformation | 7+ yrs Global Career",
  contact: {
    email: "hchoi41@illinois.edu",
    linkedin: "linkedin.com/in/hongik-max-choi",
    location: "Seoul, South Korea"
  },
  summary: [
    "7년 이상 글로벌 게임 산업에 종사하며, 5년 이상 사업 프로젝트 매니저로 활동했습니다. PURPLE 플랫폼 38개국 론칭($3M+ 규모)을 리딩하고, Amazon Games M&A 딜(쓰론앤리버티)을 지원했으며, 전사 개발 효율화 파일럿을 지원(예. 글로벌 아트 리더, CBT 절차 도입, 빌드 테스트 룸 설치 등) 했습니다.",
    "현재 University of Illinois at Urbana-Champaign MSA(회계학 석사) 과정 중이며, Big 4 Advisory 및 FP&A 역할을 목표로 커리어 전환을 준비하고 있습니다. 장기적으로는 비즈니스 전반(Wide)과 회계/재무/세무 전문성(Deep)을 아우르는 M자형 인재로서 글로벌 비즈니스 성공을 지원하고자 합니다."
  ]
};

// 대화 메타데이터 (실제 데이터 기반 - 47개 세션 확인됨)
const conversationMeta = {
  period: "2022.11 ~ 현재",
  totalChats: "500+",
  totalMessages: "10,000+",
  avgDaily: "5시간+",
  aiPlatforms: [
    { name: "ChatGPT", startDate: "November 2022" },
    { name: "Claude", startDate: "September 2023" },
    { name: "Gemini", startDate: "March 2023" }
  ],
  topics: [
    { name: "이력서/경력기술서", count: 20 },
    { name: "직무 분석 (JD)", count: 18 },
    { name: "커리어 전환 전략", count: 12 },
    { name: "학업/자격증", count: 8 },
    { name: "면접/네트워킹", count: 5 }
  ],
  highlights: [
    "매일 평균 5시간+ 대화",
    "최신 모델 활용 (GPT-4o, Claude 3.5/4, Gemini Pro)",
    "정보 습득 및 생성, 코딩 및 업무 효율화, 의사결정 지원"
  ]
};

// 이력서 메타데이터
const resumeMeta = {
  totalDocuments: 35,
  languages: { korean: 20, english: 15 },
  types: [
    { name: "이력서 (Resume)", count: 18 },
    { name: "경력기술서 (CV)", count: 8 },
    { name: "자기소개서", count: 5 },
    { name: "프로젝트 문서", count: 4 }
  ],
  sources: [
    "NCSOFT 프로젝트 파일",
    "Nexon Korea 경력",
    "PMP 신청서",
    "LinkedIn 프로필",
    "University of Illinois MSA 지원서"
  ]
};

// 인사평가/다면평가 메타데이터
const performanceReviewMeta = {
  period: "2019 ~ 2021",
  company: "NCSOFT",
  type: "다면평가 (360° Feedback)",
  evaluators: [
    { role: "팀원/동료", count: 8 },
    { role: "상위 리더", count: 3 },
    { role: "협업 부서", count: 5 }
  ],
  highlights: [
    "프로젝트 리딩 및 커뮤니케이션 역량 호평",
    "글로벌 협업 및 이해관계자 관리 강점",
    "체계적 업무 프로세스 구축 인정"
  ],
  keyFeedback: [
    { type: "Good", text: "구조화된 커뮤니케이션과 체계적 업무 진행" },
    { type: "Good", text: "복잡한 이해관계자 조율 및 갈등 해결" },
    { type: "Improve", text: "세부 사항 위임 및 효율적 권한 배분" }
  ]
};

// ===== 수정된 재능 데이터 (Venn Diagram 논리 수정) =====
// 총 22개 재능: 대화에서만 7개 + 교집합 8개 + 이력서에서만 7개
// 대화 총: 7 + 8 = 15개, 이력서 총: 7 + 8 = 15개
// 교집합 8개 ≤ min(15, 15) = 15 ✓ 수학적으로 올바름

const talents = {
  // 대화에서만 발견된 재능 (메타인지, 성향, 사고방식 - 이력서에 명시 안 됨)
  conversationOnly: [
    { name: "의사결정 맥락 판단", category: "전략 & 분석", desc: "1-way vs 2-way door를 구분하고 상황에 맞게 접근" },
    { name: "전략적 Landscape 분석", category: "전략 & 분석", desc: "다양한 party와 지형을 파악하고 공략/수비 전략 수립" },
    { name: "지식관리체계 설계", category: "기술 & 데이터", desc: "10년간 구축/운영해온 개인 노트 시스템" },
    { name: "장기 트렌드 예측", category: "전략 & 분석", desc: "산업/기술의 미래 방향을 읽고 선제적 포지셔닝" },
    { name: "융합적 패턴 인식", category: "전략 & 분석", desc: "분야 간 연결고리와 경우의 수를 빠르게 파악" },
    { name: "실패 기반 시스템 개선", category: "실행 & 관리", desc: "경험에서 방법론을 추출하고 접근법을 업데이트" },
    { name: "솔직한 자기인식", category: "리더십 & 협업", desc: "강점/약점을 객관적으로 파악하고 인정" },
    { name: "사실 기반 판단 중시", category: "전략 & 분석", desc: "데이터에 기반하여 맥락에 맞는 감정/감성을 더한 의사결정" },
    { name: "몰입과 끈기", category: "실행 & 관리", desc: "관심 분야에 수년간 깊이 파고드는 집중력과 지구력" }
  ],
  
  // 양쪽 모두에서 확인된 재능 (핵심 역량 - 대화에서 논의 + 이력서에 기재)
  intersection: [
    { name: "한영 바이링궐 커뮤니케이션", category: "글로벌 & 언어", weight: 10 },
    { name: "글로벌 프로젝트 론칭", category: "글로벌 & 언어", weight: 10 },
    { name: "M&A/딜 지원 실무", category: "재무 & 사업", weight: 9 },
    { name: "사업 조건 리스크 검토", category: "재무 & 사업", weight: 8 },
    { name: "경영진 보고 및 프레젠테이션", category: "리더십 & 협업", weight: 9 },
    { name: "Power BI/SQL 데이터 분석", category: "기술 & 데이터", weight: 8 },
    { name: "Cross-functional 리더십", category: "리더십 & 협업", weight: 9 },
    { name: "프로세스 자동화", category: "기술 & 데이터", weight: 8 },
    { name: "글로벌 파트너십 관리", category: "글로벌 & 언어", weight: 9 }
  ],
  
  // 이력서에서만 발견된 재능 (구체적 실적, 자격 - 대화에서 깊이 논의 안 됨)
  resumeOnly: [
    { name: "PMBOK 기반 워크플로우 설계", category: "실행 & 관리", desc: "300+ 이해관계자 구조화" },
    { name: "CBT 운영 프레임워크 구축", category: "실행 & 관리", desc: "피드백 루프 및 운영 체계 설계" },
    { name: "대규모 프로젝트 리드 ($3M+)", category: "재무 & 사업", desc: "PURPLE 38개국 론칭 프로젝트" },
    { name: "CNN 기반 AI 프로젝트 리드", category: "기술 & 데이터", desc: "2017년 7인팀 표정인식 AI" },
    { name: "영어 교육 사업 운영", category: "재무 & 사업", desc: "PS Edu Holdings $0→$10K/월" },
    { name: "군 정보 보안 경험", category: "실행 & 관리", desc: "수도방위사령부 정보병 2010-2012" },
    { name: "IB 디플로마 학력", category: "글로벌 & 언어", desc: "International School Manila 2003-2007" }
  ]
};

// Venn Diagram 통계 계산
const vennStats = {
  conversationOnly: talents.conversationOnly.length,  // 7
  intersection: talents.intersection.length,           // 9
  resumeOnly: talents.resumeOnly.length,               // 7
  conversationTotal: talents.conversationOnly.length + talents.intersection.length,  // 15
  resumeTotal: talents.resumeOnly.length + talents.intersection.length,              // 15
  total: talents.conversationOnly.length + talents.intersection.length + talents.resumeOnly.length  // 23
};

// 상세 정보가 포함된 achievements 데이터
const achievementsData = [
  { 
    metric: "38개국", 
    label: "글로벌 론칭 (권역별 순차)",
    labelEn: "Global Launch (Regional Rollout)",
    
    hasDetail: true,
    detail: {
      title: "38개국 글로벌 순차 론칭",
      subtitle: "PURPLE 플랫폼 & 리니지2M 글로벌 확장",
      timeline: [
        {
          phase: "1차 론칭",
          region: "대한민국",
          date: "2019.10 - 2019.11",
          description: "모바일 앱 출시 후 PC 버전 확장",
          links: [
            { label: "모바일 앱 출시", url: "https://www.nc.com/newsroom/news/articles/?articleId=5da50c000000000000000b1d&boardLanguage=ko&locale=ko-KR" },
            { label: "PC 앱 베타 서비스 시작", url: "https://www.nc.com/newsroom/news/articles/?articleId=5dddbc800000000000000b4c&boardLanguage=ko&locale=ko-KR" }
          ]
        },
        {
          phase: "2차 론칭",
          region: "대만 / 일본 / 홍콩 / 마카오",
          date: "2021.03",
          description: "리니지2M 아시아 권역 동시 출시",
          links: [
            { label: "대만/일본 서비스 시작", url: "https://www.nc.com/newsroom/news/articles/?articleId=605a81000000000000001291&boardLanguage=ko&locale=ko-KR" }
          ]
        },
        {
          phase: "3차 론칭",
          region: "북미 / 서유럽 / 동유럽 / 러시아 / 중동",
          date: "2021.08 - 2021.11",
          description: "리니지2M 글로벌 확장",
          links: [
            { label: "글로벌 29개국", url: "https://www.nc.com/newsroom/news/articles/?articleId=6153ac80000000000000136a&boardLanguage=ko&locale=ko-KR" }
          ]
        }
      ]
    }
  },
  { 
    metric: "13M+", 
    label: "사전예약 (퍼플 + 리니지2M PC)",
    labelEn: "Pre-registrations (PURPLE + L2M PC)",
    
    hasDetail: true,
    detail: {
      title: "리니지2M 글로벌 사전예약",
      subtitle: "다권역 순차 출시를 통한 누적 달성 (PURPLE 플랫폼)",
      phases: [
        { phase: "1차", region: "대한민국", date: "2019.11", game: "리니지2M", verified: "738만" },
        { phase: "2차", region: "대만/일본", date: "2021.03", game: "리니지2M", verified: "TW 350만+, JP 220만+" },
        { phase: "3차", region: "글로벌 29개국", date: "2021.11", game: "리니지2M" }
      ],
      note: "* PURPLE 플랫폼을 통한 사전예약 및 사전 다운로드 통합 관리"
    }
  },
  { 
    metric: "$3M+", 
    label: "프로젝트 규모 (퍼플 글로벌 확장)",
    labelEn: "Project Scale (PURPLE Global Expansion)",
    
    hasDetail: true,
    detail: {
      title: "$3M+ 프로젝트 규모",
      subtitle: "PURPLE 플랫폼 글로벌 론칭 프로젝트",
      items: [
        "38개국 동시 서비스를 위한 인프라 구축",
        "Google Play / App Store 글로벌 계약 협상",
        "다국어 로컬라이제이션 (6개 언어)",
        "글로벌 법무/컴플라이언스 대응 (GDPR 등)",
        "연간 추정 매출 ~$100M (플랫폼 기여분)"
      ]
    }
  },
  { 
    metric: "300명+", 
    label: "이해관계자",
    labelEn: "Stakeholders",
    
    hasDetail: true,
    detail: {
      title: "300+ 이해관계자 관리",
      subtitle: "Cross-functional 협업 구조",
      groups: [
        { name: "개발팀", count: "150+", desc: "클라이언트/서버/QA" },
        { name: "마케팅/PR", count: "30+", desc: "글로벌 GTM 전략" },
        { name: "현지 법인", count: "50+", desc: "NC Taiwan, NC Japan, NC West" },
        { name: "외부 파트너", count: "40+", desc: "Google, Apple, TransPerfect 등" },
        { name: "경영진", count: "20+", desc: "CEO 직보 라인" },
        { name: "법무/재무", count: "10+", desc: "계약/컴플라이언스" }
      ]
    }
  },
  { 
    metric: "10+hrs/wk", 
    label: "업무 자동화를 통한 팀 업무시간 절감",
    labelEn: "Team Hours Saved via Automation",
    
    hasDetail: true,
    detail: {
      title: "주간 10시간+ 팀 업무시간 절감",
      subtitle: "데이터 보고 자동화 구축",
      automations: [
        { tool: "Power Automate", task: "일일 KPI 리포트 자동 생성/배포", saved: "3시간/주" },
        { tool: "Power BI", task: "실시간 대시보드 자동 갱신", saved: "2시간/주" },
        { tool: "SharePoint", task: "문서 버전 관리 및 승인 워크플로우", saved: "2시간/주" },
        { tool: "Excel VBA", task: "데이터 정제 및 포맷 변환 자동화", saved: "2시간/주" },
        { tool: "Jira", task: "이슈 트래킹 자동 알림 및 에스컬레이션", saved: "1시간/주" }
      ]
    }
  },
  { 
    metric: "3.84/4.00", 
    label: "MSA GPA",
    labelEn: "MSA GPA",
    
    hasDetail: true,
    detail: {
      title: "University of Illinois MSA GPA 3.84/4.0",
      subtitle: "Master of Science in Accountancy (2024-2026)",
      courses: [
        { code: "ACCY 501", name: "Accounting Analysis I", grade: "A" },
        { code: "ACCY 502", name: "Accounting Analysis II", grade: "B+" },
        { code: "ACCY 503", name: "Managerial Accounting", grade: "A-" },
        { code: "ACCY 504", name: "Auditing", grade: "A" },
        { code: "ACCY 505", name: "Federal Taxation", grade: "A" },
        { code: "ACCY 550", name: "Multistate Taxation", grade: "A" },
        { code: "ACCY 554", name: "International Taxation", grade: "A" },
        { code: "ACCY 569", name: "Data Driven Decision in Accounting", grade: "A" }
      ],
      certifications: [
        "CPA 자격시험 준비 중 (2026-2027 목표)",
        "Pennsylvania State University Applied Statistics Certificate (GPA 3.84)"
      ]
    }
  }
];

// 이전 호환성을 위한 간단한 배열
const achievements = achievementsData.map(a => ({
  metric: a.metric,
  label: a.label,
  icon: a.icon
}));

const experience = [
  {
    company: "NCSOFT",
    role: "IT Project Manager - PDMO",
    period: "2022.05 - 2023.01",
    highlights: ["Amazon Games 딜 지원", "BCG 컨설팅 협업", "생성형 AI 파일럿"]
  },
  {
    company: "NCSOFT",
    role: "Business PM - PURPLE",
    period: "2019.06 - 2022.05",
    highlights: ["38개국 론칭", "13M+ 사전예약 (리니지2M)", "Google Play 협상"]
  },
  {
    company: "Nexon Korea",
    role: "Project Manager",
    period: "2017.11 - 2019.06",
    highlights: ["SINoALICE 150개국 준비", "6개 언어 로컬라이제이션"]
  }
];

const education = [
  { school: "University of Illinois at Urbana-Champaign", degree: "MS Accountancy (MSA)", period: "2024-2026", gpa: "3.84" },
  { school: "Pennsylvania State University", degree: "Grad Cert. Applied Statistics", period: "2023-2024", gpa: "3.84" },
  { school: "University of Illinois at Urbana-Champaign", degree: "BA Communication", period: "2007-2014", gpa: "-" }
];

const certifications = [
  "PMP (Project Management Professional)",
  "Microsoft Power BI Data Analyst",
  "Google Data Analytics",
  "경영정보시각화 (대한상공회의소)"
];

const jobPositions = [
  {
    id: "fpa",
    title: "FP&A Analyst",
    company: "게임/테크 기업",
    fit: 75,
    matchedSkills: ["Power BI/SQL", "대규모 프로젝트 경험", "경영진 보고", "시장 분석", "KPI 대시보드"],
    gaps: ["직접적 FP&A 경력", "ERP 시스템 경험"],
    keywords: ["financial planning", "analysis", "budgeting", "forecasting", "variance", "P&L"]
  },
  {
    id: "strategy",
    title: "Strategy Analyst",
    company: "게임 스타트업",
    fit: 82,
    matchedSkills: ["M&A 딜 지원", "시장 분석", "경영진 보고", "글로벌 파트너십", "투자 검토 지원"],
    gaps: ["PE/VC 경력", "직접적 IR 경험"],
    keywords: ["strategy", "M&A", "investment", "IR", "due diligence", "valuation"]
  },
  {
    id: "big4",
    title: "FAAS/CMAAS Senior",
    subtitle: "(Financial/Capital Markets Accounting Advisory Services)",
    company: "Big 4 Advisory",
    fit: 65,
    matchedSkills: ["딜 지원 경험", "회계 석사", "글로벌 경험", "바이링궐"],
    gaps: ["직접적 회계 실무", "SOX/ITGC 경험", "CPA 자격"],
    keywords: ["FAAS", "CMAAS", "accounting", "advisory", "transaction", "IPO", "audit"]
  },
  {
    id: "pm",
    title: "Strategic PM",
    company: "글로벌 테크",
    fit: 90,
    matchedSkills: ["PMP 자격", "글로벌 론칭", "Cross-functional 리더십", "PMBOK", "이해관계자 관리"],
    gaps: ["Agile/Scrum 심화"],
    keywords: ["project management", "stakeholder", "PMBOK", "agile", "cross-functional", "global"]
  },
  {
    id: "bizdev",
    title: "BD Manager",
    company: "게임 퍼블리셔",
    fit: 85,
    matchedSkills: ["글로벌 파트너십", "플랫폼 협상", "딜 지원", "계약 분석", "바이링궐"],
    gaps: ["독립적 딜 클로징 경험"],
    keywords: ["business development", "partnership", "negotiation", "deal", "licensing", "publishing"]
  }
];

// ===== SKILLS DATA (40 Skills from LinkedIn) =====
const skillsData = {
  "Finance & Accounting": {
    
    color: "#10B981",
    skills: [
      { name: "Financial Modeling", source: "CFI Course" },
      { name: "Accounting", source: "UIUC MSA" },
      { name: "Financial Accounting", source: "UIUC MSA" },
      { name: "Tax Accounting", source: "UIUC MSA" },
      { name: "Auditing", source: "UIUC MSA" },
      { name: "Managerial Accounting", source: "UIUC MSA" },
      { name: "Cost Accounting", source: "UIUC MSA" }
    ]
  },
  "Data & Analytics": {
    
    color: "#3B82F6",
    skills: [
      { name: "Analytics", source: "NCSOFT, PSU" },
      { name: "Statistics", source: "PSU" },
      { name: "Business Intelligence (BI)", source: "NCSOFT" },
      { name: "Data Mining", source: "PSU" },
      { name: "Data Modeling", source: "PSU, Power BI" },
      { name: "Data Visualization", source: "Power BI Cert" },
      { name: "ETL (Extract, Transform, Load)", source: "실무 경험" },
      { name: "Microsoft Power BI", source: "MS 자격증" },
      { name: "Tableau", source: "UIUC" },
      { name: "Microsoft Excel", source: "다수 자격증" },
      { name: "DAX", source: "Power BI Cert" },
      { name: "SQL", source: "NCSOFT, 자격증" },
      { name: "R", source: "UIUC, PSU" }
    ]
  },
  "Tech & Productivity": {
    
    color: "#8B5CF6",
    skills: [
      { name: "Microsoft Power Automate", source: "NCSOFT" },
      { name: "SharePoint", source: "NCSOFT" },
      { name: "Jira", source: "NCSOFT, Nexon" },
      { name: "VBA", source: "UIUC" },
      { name: "Python", source: "NCS 560시간" },
      { name: "Figma", source: "실무 경험" }
    ]
  },
  "AI & Technology": {
    
    color: "#F59E0B",
    skills: [
      { name: "Artificial Intelligence (AI)", source: "표정인식 AI 프로젝트" },
      { name: "Generative AI Tools", source: "Global Art Leader" }
    ]
  },
  "Project Management": {
    
    color: "#EF4444",
    skills: [
      { name: "Project Management", source: "PMP 자격증" },
      { name: "Service Launches", source: "SINoALICE, PURPLE, L2M" },
      { name: "Product Compliance", source: "PURPLE 글로벌" },
      { name: "Systems Thinking", source: "실무 경험" },
      { name: "Optimization", source: "UIUC" },
      { name: "Flow Charts", source: "NCSOFT" }
    ]
  },
  "Global & Language": {
    
    color: "#06B6D4",
    skills: [
      { name: "English Translation", source: "5개 회사 경험" },
      { name: "Software Localization", source: "Nexon, NCSOFT" }
    ]
  },
  "Business & Soft Skills": {
    
    color: "#EC4899",
    skills: [
      { name: "Communication", source: "9개 회사 경험" },
      { name: "Leadership", source: "군 정보병, 프로젝트 리드" },
      { name: "Marketing", source: "Nexon, PURPLE" },
      { name: "Market Research", source: "실무 경험" }
    ]
  }
};

const totalSkillsCount = Object.values(skillsData).reduce((acc, cat) => acc + cat.skills.length, 0);


// ===== ACHIEVEMENT MODAL COMPONENT =====
const AchievementModal = ({ achievement, onClose }) => {
  if (!achievement || !achievement.detail) return null;
  
  const { detail } = achievement;
  
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div 
        className="bg-slate-900 border border-slate-600 rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-slate-900 border-b border-slate-800 p-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-900 to-blue-950 rounded-xl flex items-center justify-center text-2xl">
              {achievement.icon}
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">{detail.title}</h2>
              <p className="text-sm text-slate-200">{detail.subtitle}</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-200 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>
        
        {/* Content */}
        <div className="p-6 space-y-6">
          {/* 38개국 론칭 - Timeline */}
          {detail.timeline && (
            <div className="space-y-4">
              {detail.timeline.map((phase, i) => (
                <div key={i} className="relative pl-8 pb-6 border-l-2 border-blue-500/40 last:border-l-0 last:pb-0">
                  <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-blue-600 border-2 border-slate-800" />
                  <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-800">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-blue-400 font-bold">{phase.phase}</span>
                      <span className="text-xs text-slate-300">{phase.date}</span>
                    </div>
                    <h4 className="text-white font-medium mb-1">{phase.region}</h4>
                    <p className="text-sm text-slate-200 mb-3">{phase.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {phase.links.map((link, j) => (
                        <a 
                          key={j}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs px-3 py-1.5 bg-blue-900/20 hover:bg-blue-900/40 text-blue-400 rounded-lg transition-colors flex items-center gap-1"
                        >
                          <ExternalLink className="w-3 h-3" />
                          {link.label}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {/* 리니지2M 사전예약 - Phases */}
          {detail.phases && (
            <div className="space-y-3">
              {detail.phases.map((item, i) => (
                <div key={i} className="bg-slate-800/50 rounded-lg p-4 border border-slate-800">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 bg-blue-900/30 text-blue-400 text-xs rounded font-bold">{item.phase}</span>
                      <span className="text-white font-medium">{item.region}</span>
                    </div>
                    <span className="text-xs text-slate-300">{item.date}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-300">{item.game}</span>
                    {item.verified && (
                      <span className="text-sm text-emerald-400 font-medium">{item.verified}</span>
                    )}
                  </div>
                </div>
              ))}
              {detail.note && (
                <p className="text-xs text-slate-400 mt-2 whitespace-pre-line">{detail.note}</p>
              )}
            </div>
          )}
          
          {/* $3M+ 프로젝트 - Items */}
          {detail.items && (
            <div className="space-y-2">
              {detail.items.map((item, i) => (
                <div key={i} className="flex items-start gap-3 text-slate-200">
                  <span className="text-emerald-400 mt-0.5">✓</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          )}
          
          {/* 300+ 이해관계자 - Groups */}
          {detail.groups && (
            <div className="grid grid-cols-2 gap-3">
              {detail.groups.map((group, i) => (
                <div key={i} className="bg-slate-800/50 rounded-lg p-4 border border-slate-800">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-white font-medium">{group.name}</span>
                    <span className="text-lg font-bold text-purple-400">{group.count}</span>
                  </div>
                  <div className="text-xs text-slate-300">{group.desc}</div>
                </div>
              ))}
            </div>
          )}
          
          {/* 10+시간/주 - Automations */}
          {detail.automations && (
            <div className="space-y-3">
              {detail.automations.map((auto, i) => (
                <div key={i} className="flex items-center justify-between bg-slate-800/50 rounded-lg p-3 border border-slate-800">
                  <div className="flex items-center gap-3">
                    <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded font-mono">{auto.tool}</span>
                    <span className="text-slate-200 text-sm">{auto.task}</span>
                  </div>
                  <span className="text-emerald-400 font-bold whitespace-nowrap">-{auto.saved}</span>
                </div>
              ))}
            </div>
          )}
          
          {/* 3.84 GPA - Courses */}
          {detail.courses && (
            <div className="space-y-4">
              <div className="space-y-2">
                <h4 className="text-sm text-slate-300 font-medium">주요 과목</h4>
                {detail.courses.map((course, i) => (
                  <div key={i} className="flex items-center justify-between bg-slate-800/50 rounded-lg px-4 py-2 border border-slate-800">
                    <div>
                      <span className="text-xs text-blue-400 font-mono mr-2">{course.code}</span>
                      <span className="text-slate-200 text-sm">{course.name}</span>
                    </div>
                    <span className={`font-bold ${course.grade === 'A' ? 'text-emerald-400' : course.grade === 'A-' ? 'text-emerald-400' : course.grade === 'B+' ? 'text-blue-400' : 'text-slate-300'}`}>
                      {course.grade}
                    </span>
                  </div>
                ))}
              </div>
              {detail.certifications && (
                <div className="space-y-2">
                  <h4 className="text-sm text-slate-300 font-medium">자격증 / 추가 학력</h4>
                  {detail.certifications.map((cert, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-slate-200">
                      <span className="text-blue-400">•</span>
                      {cert}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
        
        {/* Footer */}
        <div className="border-t border-slate-800 p-4 text-center">
          <button 
            onClick={onClose}
            className="px-6 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};


// ===== COMPONENTS =====

// Consistent Section Heading Component
const SectionHeading = ({ children, className = "" }) => (
  <h2 className={`text-lg font-bold text-white mb-4 ${className}`}>{children}</h2>
);

const Navigation = ({ activeTab, setActiveTab, language, setLanguage }) => {
  const t = translations[language];
  
  const tabs = [
    { id: 'overview', labelKey: 'overview' },
    { id: 'narrative', labelKey: 'narrative' },
    { id: 'talents', labelKey: 'talents' },
    { id: 'skills', labelKey: 'skills' },
    { id: 'positions', labelKey: 'positions' },
    { id: 'inputs', labelKey: 'jdAnalysis' },
    { id: 'contact', labelKey: 'contact' }
  ];
  
  return (
    <nav className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-600 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🚀</span>
            <span className="font-bold text-white text-lg">Max Choi Portfolio</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex gap-1 flex-wrap">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeTab === tab.id
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-200 hover:text-white hover:bg-slate-700'
                  }`}
                >
                  {t.nav[tab.labelKey]}
                </button>
              ))}
            </div>
            {/* Language Toggle */}
            <div className="flex items-center ml-4 border-l border-slate-600 pl-4">
              <button
                onClick={() => setLanguage(language === 'ko' ? 'en' : 'ko')}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm font-medium transition-all border border-slate-500"
              >
                <span className="text-white font-bold">{language === 'ko' ? 'KO' : 'EN'}</span>
                <span className="text-slate-300">/</span>
                <span className="text-slate-300">{language === 'ko' ? 'EN' : 'KO'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

const OverviewTab = () => {
  const [selectedAchievement, setSelectedAchievement] = useState(null);
  const { language, t } = useLanguage();
  
  return (
    <div className="space-y-8">
      {/* Achievement Modal */}
      {selectedAchievement && (
        <AchievementModal 
          achievement={selectedAchievement} 
          onClose={() => setSelectedAchievement(null)} 
        />
      )}
      
      <div className="text-center py-12 bg-gradient-to-br from-blue-900/30 to-indigo-900/30 rounded-2xl border border-blue-500/30">
        <div className="text-6xl mb-4">👨‍💼</div>
        <h1 className="text-4xl font-bold text-white mb-2">{t.profile.name}</h1>
        <p className="text-xl text-blue-400 mb-4">{t.profile.tagline}</p>
        <div className="max-w-2xl mx-auto px-4 text-left space-y-4">
          {t.profile.summary.map((paragraph, i) => (
            <div key={i} className="flex gap-3">
              <span className="text-xl mt-0.5">{i === 0 ? '🎮' : '🌍'}</span>
              <p className="text-slate-200">{paragraph}</p>
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-4 mt-6 flex-wrap">
          <span className="px-3 py-1 bg-slate-700 rounded-full text-sm text-slate-200">{profileData.contact.email}</span>
          <span className="px-3 py-1 bg-slate-700 rounded-full text-sm text-slate-200">{profileData.contact.linkedin}</span>
        </div>
      </div>
      
      {/* Clickable Achievements */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {achievementsData.map((a, i) => (
          <button 
            key={i} 
            onClick={() => a.hasDetail && setSelectedAchievement(a)}
            className={`bg-slate-800/50 border border-slate-600 rounded-xl p-4 text-center transition-all relative ${
              a.hasDetail 
                ? 'hover:border-blue-500/50 hover:bg-slate-700/50 cursor-pointer' 
                : ''
            }`}
          >
            {a.hasDetail && (
              <span className="absolute top-2 right-2 text-blue-400 text-xs">↗</span>
            )}
            <div className="text-2xl font-bold text-white">{a.metric}</div>
            <div className="text-xs text-slate-200">{language === 'ko' ? a.label : a.labelEn || a.label}</div>
          </button>
        ))}
      </div>
      
      <div className="bg-slate-800/50 border border-slate-600 rounded-xl p-6">
        <SectionHeading>{t.sections.experience}</SectionHeading>
        <div className="space-y-6">
          {experience.map((exp, i) => (
            <div key={i} className="flex gap-4">
              <div className="w-2 bg-gradient-to-b from-blue-700 to-purple-800 rounded-full"></div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="font-bold text-white">{exp.company}</span>
                  <span className="text-slate-400">•</span>
                  <span className="text-blue-400">{language === 'ko' ? exp.role : exp.roleEn || exp.role}</span>
                </div>
                <div className="text-sm text-slate-400 mb-2">{exp.period}</div>
                <div className="flex flex-wrap gap-2">
                  {exp.highlights.map((h, j) => (
                    <span key={j} className="px-2 py-1 bg-slate-700/50 rounded text-xs text-slate-200">{h}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-slate-800/50 border border-slate-600 rounded-xl p-6">
          <SectionHeading>{t.sections.education}</SectionHeading>
          <div className="space-y-3">
            {education.map((edu, i) => (
              <div key={i} className="flex justify-between items-center">
                <div>
                  <div className="font-medium text-white">{edu.school}</div>
                  <div className="text-sm text-slate-200">{edu.degree}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-slate-400">{edu.period}</div>
                  {edu.gpa !== "-" && <div className="text-sm text-emerald-400">GPA {edu.gpa}</div>}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-slate-800/50 border border-slate-600 rounded-xl p-6">
          <SectionHeading>{t.sections.certifications}</SectionHeading>
          <div className="space-y-2">
            {certifications.map((cert, i) => (
              <div key={i} className="flex items-center gap-2 text-slate-200">
                <span className="text-emerald-400">✓</span>
                {cert}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const TalentsTab = () => {
  const [selectedSection, setSelectedSection] = useState('capabilities');
  const [showMethodology, setShowMethodology] = useState(false);
  const { language, t } = useLanguage();
  
  const getCurrentTalents = () => {
    switch(selectedSection) {
      case 'talents': return talents.conversationOnly;
      case 'achievements': return talents.resumeOnly;
      case 'capabilities': return talents.intersection;
      default: return talents.intersection;
    }
  };
  
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">{t.sections.talentAnalysis}</h2>
        <p className="text-slate-200">{t.sections.talentDesc}</p>
      </div>
      
      {/* Talent Flow: 재능 → 역량 → 결과물 */}
      <div className="bg-slate-800/50 border border-slate-600 rounded-xl p-6">
        {/* Flow Diagram */}
        <div className="flex flex-row items-center justify-center gap-2 sm:gap-4 mb-8">
          {[
            { 
              id: 'talents', 
              label: '재능', 
              labelEn: 'Talents',
              count: vennStats.conversationOnly, 
              color: 'blue',
              desc: '어떤 특성을 가졌나',
              icon: '💎'
            },
            { 
              id: 'capabilities', 
              label: '역량', 
              labelEn: 'Capabilities',
              count: vennStats.intersection, 
              color: 'yellow',
              desc: '제공할 수 있는 서비스',
              icon: '⚡'
            },
            { 
              id: 'achievements', 
              label: '결과물', 
              labelEn: 'Achievements',
              count: vennStats.resumeOnly, 
              color: 'emerald',
              desc: '해낸 것',
              icon: '🏆'
            }
          ].map((item, idx) => {
            const isSelected = selectedSection === item.id;
            const colorClasses = {
              blue: isSelected ? 'bg-blue-900/40 border-blue-500 shadow-blue-500/20' : 'bg-blue-900/20 border-blue-500/40 hover:border-blue-500/70',
              yellow: isSelected ? 'bg-yellow-900/40 border-yellow-500 shadow-yellow-500/20' : 'bg-yellow-900/20 border-yellow-500/40 hover:border-yellow-500/70',
              emerald: isSelected ? 'bg-emerald-900/40 border-emerald-500 shadow-emerald-500/20' : 'bg-emerald-900/20 border-emerald-500/40 hover:border-emerald-500/70'
            };
            const textColors = {
              blue: 'text-blue-400',
              yellow: 'text-yellow-400',
              emerald: 'text-emerald-400'
            };
            
            return (
              <React.Fragment key={item.id}>
                {/* Arrow between boxes */}
                {idx > 0 && (
                  <div className="text-xl text-slate-500">→</div>
                )}
                
                {/* Box */}
                <button
                  onClick={() => setSelectedSection(item.id)}
                  className={`relative flex-1 max-w-[180px] p-3 sm:p-4 rounded-xl border-2 transition-all cursor-pointer text-center ${colorClasses[item.color]} ${isSelected ? 'shadow-lg' : ''}`}
                >
                  <div className="text-2xl mb-1">{item.icon}</div>
                  <div className={`text-xl sm:text-2xl font-bold ${textColors[item.color]}`}>{item.count}</div>
                  <div className="text-white font-medium text-sm sm:text-base">{item.label}</div>
                  <div className="text-xs text-slate-300 mt-1 leading-relaxed">{item.desc}</div>
                </button>
              </React.Fragment>
            );
          })}
        </div>
        
        {/* Selected Section Detail */}
        <div className={`rounded-xl border p-5 ${
          selectedSection === 'talents' ? 'bg-blue-900/20 border-blue-500/40' :
          selectedSection === 'achievements' ? 'bg-emerald-900/20 border-emerald-500/40' :
          'bg-yellow-900/20 border-yellow-500/40'
        }`}>
          <h4 className={`font-bold mb-4 flex items-center gap-2 ${
            selectedSection === 'talents' ? 'text-blue-300' :
            selectedSection === 'achievements' ? 'text-emerald-300' :
            'text-yellow-300'
          }`}>
            {selectedSection === 'talents' ? '💎 재능 — 어떤 특성을 가졌나' :
             selectedSection === 'achievements' ? '🏆 결과물 — 해낸 것' :
             '⚡ 역량 — 제공할 수 있는 서비스'}
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {getCurrentTalents().map((t, i) => (
              <div key={i} className={`flex items-start gap-3 px-3 py-2 bg-slate-800/50 rounded-lg border-l-2 ${
                selectedSection === 'talents' ? 'border-l-blue-500' :
                selectedSection === 'achievements' ? 'border-l-emerald-500' : 'border-l-yellow-500'
              }`}>
                <span className={`text-xs font-mono mt-1 ${
                  selectedSection === 'talents' ? 'text-blue-400' :
                  selectedSection === 'achievements' ? 'text-emerald-400' : 'text-yellow-400'
                }`}>{(i+1).toString().padStart(2,'0')}</span>
                <div className="flex-1">
                  <div className="text-slate-200 text-sm font-medium">{t.name}</div>
                  <div className="text-xs text-slate-400">{t.category}</div>
                  {t.desc && <div className="text-xs text-slate-200 mt-1">{t.desc}</div>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 방법론 - Collapsible Section */}
      <div className="border border-slate-600 rounded-xl overflow-hidden">
        <button
          onClick={() => setShowMethodology(!showMethodology)}
          className="w-full px-6 py-4 bg-slate-800/50 hover:bg-slate-700/50 transition-all flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <span className="text-xl">📚</span>
            <span className="font-bold text-white">방법론</span>
            <span className="text-sm text-slate-200">— 데이터 수집 및 분석 방법</span>
          </div>
          <span className={`text-xl text-slate-200 transition-transform duration-300 ${showMethodology ? 'rotate-180' : ''}`}>
            ▼
          </span>
        </button>
        
        {showMethodology && (
          <div className="p-6 bg-slate-900/30 border-t border-slate-600">
            <div className="grid md:grid-cols-3 gap-6">
              {/* 생성형 AI와의 대화 */}
              <div className="bg-gradient-to-br from-blue-900/30 to-blue-700/20 border border-blue-500/40 rounded-xl p-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-blue-900 rounded-xl flex items-center justify-center text-sm font-bold text-white">AI</div>
                  <div>
                    <h3 className="font-bold text-white text-sm">생성형 AI와의 대화</h3>
                    <p className="text-xs text-blue-400">{conversationMeta.period}</p>
                  </div>
                </div>
                
                {/* AI Platforms */}
                <div className="space-y-1.5 mb-3">
                  {conversationMeta.aiPlatforms.map((platform, i) => (
                    <div key={i} className="flex items-center justify-between bg-slate-900/50 rounded-lg px-2 py-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-300">{platform.name.charAt(0)}</span>
                        <span className="text-xs text-slate-200 font-medium">{platform.name}</span>
                      </div>
                      <span className="text-xs text-blue-400">{platform.startDate}~</span>
                    </div>
                  ))}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-2 mb-3">
                  <div className="bg-slate-900/50 rounded-lg p-2 text-center">
                    <div className="text-lg font-bold text-blue-400">{conversationMeta.avgDaily}</div>
                    <div className="text-xs text-slate-200">매일 평균</div>
                  </div>
                  <div className="bg-slate-900/50 rounded-lg p-2 text-center">
                    <div className="text-sm font-bold text-blue-400">최신 모델</div>
                    <div className="text-xs text-slate-200">주기적 활용</div>
                  </div>
                </div>
                
                {/* Highlights */}
                <div className="space-y-1">
                  {conversationMeta.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-1.5 text-xs text-slate-200">
                      <span className="text-blue-400 mt-0.5">✓</span>
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* 이력서/문서 분석 */}
              <div className="bg-gradient-to-br from-teal-900/20/30 to-teal-700/20 border border-emerald-500/30 rounded-xl p-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-xl">📄</div>
                  <div>
                    <h3 className="font-bold text-white text-sm">이력서/문서 분석</h3>
                    <p className="text-xs text-emerald-400">{resumeMeta.totalDocuments}개 문서</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-2 mb-3">
                  <div className="bg-slate-900/50 rounded-lg p-2 text-center">
                    <div className="text-lg font-bold text-emerald-400">{resumeMeta.languages.korean}</div>
                    <div className="text-xs text-slate-200">한국어</div>
                  </div>
                  <div className="bg-slate-900/50 rounded-lg p-2 text-center">
                    <div className="text-lg font-bold text-emerald-400">{resumeMeta.languages.english}</div>
                    <div className="text-xs text-slate-200">영문</div>
                  </div>
                  <div className="bg-slate-900/50 rounded-lg p-2 text-center">
                    <div className="text-lg font-bold text-emerald-400">{resumeMeta.sources.length}</div>
                    <div className="text-xs text-slate-200">소스</div>
                  </div>
                </div>
                
                <div className="space-y-1.5">
                  <div className="text-xs text-slate-200 mb-1">문서 유형</div>
                  {resumeMeta.types.map((t, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <span className="text-xs text-slate-200">{t.name}</span>
                      <div className="flex items-center gap-1.5">
                        <div className="w-16 bg-slate-700 rounded-full h-1.5">
                          <div 
                            className="bg-emerald-500 h-1.5 rounded-full" 
                            style={{ width: `${(t.count / 18) * 100}%` }}
                          />
                        </div>
                        <span className="text-xs text-emerald-400 w-4">{t.count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 인사평가/다면평가 결과 */}
              <div className="bg-gradient-to-br from-indigo-900/30 to-purple-800/20 border border-indigo-600/30 rounded-xl p-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-indigo-700 rounded-xl flex items-center justify-center text-sm font-bold text-white">360</div>
                  <div>
                    <h3 className="font-bold text-white text-sm">인사평가 결과</h3>
                    <p className="text-xs text-purple-300">{performanceReviewMeta.company} ({performanceReviewMeta.period})</p>
                  </div>
                </div>
                
                <div className="bg-slate-900/50 rounded-lg px-3 py-2 mb-3">
                  <div className="text-xs text-purple-400 font-medium">{performanceReviewMeta.type}</div>
                </div>

                {/* Evaluators */}
                <div className="grid grid-cols-3 gap-2 mb-3">
                  {performanceReviewMeta.evaluators.map((e, i) => (
                    <div key={i} className="bg-slate-900/50 rounded-lg p-2 text-center">
                      <div className="text-lg font-bold text-purple-400">{e.count}</div>
                      <div className="text-xs text-slate-200">{e.role}</div>
                    </div>
                  ))}
                </div>
                
                {/* Key Feedback */}
                <div className="space-y-1.5">
                  <div className="text-xs text-slate-200 mb-1">주요 피드백</div>
                  {performanceReviewMeta.keyFeedback.map((f, i) => (
                    <div key={i} className="flex items-start gap-1.5 text-xs">
                      <span className={f.type === 'Good' ? 'text-emerald-400' : 'text-blue-400'}>
                        {f.type === 'Good' ? '✓' : '△'}
                      </span>
                      <span className="text-slate-200">{f.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
const PositionsTab = () => {
  const [selectedPosition, setSelectedPosition] = useState(jobPositions[0]);
  const { language, t } = useLanguage();
  
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">{t.sections.positions}</h2>
        <p className="text-slate-200">{language === 'ko' ? '관심 직무 클릭하여 상세 분석 확인' : 'Click a position for detailed analysis'}</p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {jobPositions.map(pos => (
          <button
            key={pos.id}
            onClick={() => setSelectedPosition(pos)}
            className={`p-4 rounded-xl border transition-all text-left ${
              selectedPosition.id === pos.id
                ? 'bg-blue-900/40 border-slate-600'
                : 'bg-slate-800/50 border-slate-600 hover:border-slate-500'
            }`}
          >
            <div className="text-2xl font-bold text-white mb-1">{pos.fit}%</div>
            <div className="font-medium text-slate-200 text-sm">{pos.title}</div>
            <div className="text-xs text-slate-400">{pos.company}</div>
          </button>
        ))}
      </div>
      
      {selectedPosition && (
        <div className="bg-slate-800/50 border border-slate-600 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
            <div>
              <h3 className="text-xl font-bold text-white">{selectedPosition.title}</h3>
              {selectedPosition.subtitle && (
                <p className="text-sm text-blue-400">{selectedPosition.subtitle}</p>
              )}
              <p className="text-slate-200">{selectedPosition.company}</p>
            </div>
            <div className="text-right">
              <div className={`text-4xl font-bold ${
                selectedPosition.fit >= 80 ? 'text-emerald-400' :
                selectedPosition.fit >= 65 ? 'text-blue-400' : 'text-blue-400'
              }`}>{selectedPosition.fit}%</div>
              <div className="text-sm text-slate-400">적합도</div>
            </div>
          </div>
          
          <div className="w-full bg-slate-700 rounded-full h-3 mb-6">
            <div
              className={`h-3 rounded-full transition-all ${
                selectedPosition.fit >= 80 ? 'bg-emerald-500' :
                selectedPosition.fit >= 65 ? 'bg-blue-500' : 'bg-blue-600'
              }`}
              style={{ width: `${selectedPosition.fit}%` }}
            />
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-emerald-400 mb-3 flex items-center gap-2">매칭 역량</h4>
              <div className="space-y-2">
                {selectedPosition.matchedSkills.map((skill, i) => (
                  <div key={i} className="flex items-center gap-2 text-slate-200">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                    {skill}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-medium text-blue-400 mb-3 flex items-center gap-2">보완 필요</h4>
              <div className="space-y-2">
                {selectedPosition.gaps.map((gap, i) => (
                  <div key={i} className="flex items-center gap-2 text-slate-200">
                    <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                    {gap}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


// ===== SKILLS TAB =====
const SkillsTab = () => {
  const [selectedCategory, setSelectedCategory] = useState(Object.keys(skillsData)[0]); // Default to first category
  const [searchTerm, setSearchTerm] = useState('');
  const { language, t } = useLanguage();

  const filteredSkills = useMemo(() => {
    if (!searchTerm.trim()) return skillsData;
    
    const term = searchTerm.toLowerCase();
    const filtered = {};
    
    Object.entries(skillsData).forEach(([category, data]) => {
      const matchingSkills = data.skills.filter(skill => 
        skill.name.toLowerCase().includes(term) ||
        skill.source.toLowerCase().includes(term)
      );
      if (matchingSkills.length > 0) {
        filtered[category] = { ...data, skills: matchingSkills };
      }
    });
    
    return filtered;
  }, [searchTerm]);

  const filteredCount = Object.values(filteredSkills).reduce((acc, cat) => acc + cat.skills.length, 0);

  // Get current category data
  const currentCategoryData = searchTerm.trim() 
    ? filteredSkills[selectedCategory] 
    : skillsData[selectedCategory];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">{t.sections.skills}</h2>
        <p className="text-slate-200">
          {language === 'ko' ? '총' : 'Total'} <span className="text-blue-400 font-bold">{totalSkillsCount}{language === 'ko' ? '개' : ''}</span>
        </p>
      </div>

      {/* Search */}
      <div className="max-w-md mx-auto">
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={language === 'ko' ? "기술 검색..." : "Search skills..."}
            className="w-full bg-slate-900 border border-slate-600 rounded-xl px-4 py-3 text-slate-200 placeholder-slate-400 focus:border-slate-600 focus:outline-none"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
            >
              ✕
            </button>
          )}
        </div>
        {searchTerm && (
          <div className="text-center text-sm text-slate-400 mt-2">
            {filteredCount}개 결과
          </div>
        )}
      </div>

      {/* Category Tab Bar */}
      <div className="bg-slate-800/50 rounded-xl p-2 border border-slate-600">
        <div className="flex flex-wrap gap-2 justify-center">
          {Object.entries(skillsData).map(([category, data]) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedCategory === category
                  ? 'bg-blue-900 text-white shadow-lg'
                  : 'bg-slate-700/50 text-slate-200 hover:bg-slate-600/50 hover:text-white'
              }`}
            >
              <span>{data.icon}</span>
              <span className="hidden sm:inline">{category}</span>
              <span className="sm:hidden">{category.split(' ')[0]}</span>
              <span className={`px-1.5 py-0.5 rounded text-xs ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-600 text-slate-200'
              }`}>
                {data.skills.length}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Selected Category Content */}
      {currentCategoryData ? (
        <div className="bg-slate-800/50 border border-slate-600 rounded-xl p-6 transition-all">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-600">
            <span className="text-3xl">{currentCategoryData.icon}</span>
            <div>
              <h3 className="text-xl font-bold text-white">{selectedCategory}</h3>
              <p className="text-sm text-slate-200">{currentCategoryData.skills.length}개 기술</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {currentCategoryData.skills.map((skill, i) => (
              <div 
                key={i}
                className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg border border-slate-600 hover:border-slate-500 hover:bg-slate-800/50 transition-all"
              >
                <div className="flex items-center gap-3">
                  <span 
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{ backgroundColor: currentCategoryData.color }}
                  />
                  <span className="text-slate-200 font-medium">{skill.name}</span>
                </div>
                <span className="text-xs text-slate-400 text-right ml-2 flex-shrink-0" title={skill.source}>
                  {skill.source}
                </span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-slate-800/50 border border-slate-600 rounded-xl p-12 text-center">
          <div className="text-4xl mb-4 text-slate-400">?</div>
          <p className="text-slate-200">검색 결과가 없습니다.</p>
          <button 
            onClick={() => setSearchTerm('')}
            className="mt-4 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-sm"
          >
            검색 초기화
          </button>
        </div>
      )}
    </div>
  );
};


// ===== INPUTS TAB (JD Analysis with LLM Backend) =====
const ANALYSIS_STORAGE_KEY = 'max_portfolio_analysis_v1';

const ALLOWED_DOC_EXTENSIONS = ['txt', 'md', 'pdf', 'doc', 'docx', 'gdoc'];
const ALLOWED_IMAGE_EXTENSIONS = ['png', 'jpg', 'jpeg', 'webp', 'gif'];

const getFileExtension = (filename = '') => {
  const idx = filename.lastIndexOf('.');
  return idx >= 0 ? filename.slice(idx + 1).toLowerCase() : '';
};

const formatBytes = (bytes = 0) => {
  if (!bytes) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.min(sizes.length - 1, Math.floor(Math.log(bytes) / Math.log(k)));
  const value = bytes / Math.pow(k, i);
  return `${value.toFixed(i === 0 ? 0 : 1)} ${sizes[i]}`;
};

const sanitizeUrl = (value) => {
  try {
    const u = new URL(value);
    return u.toString();
  } catch {
    return null;
  }
};

// ===== LLM API Integration (Backend Ready) =====
const LLM_API_CONFIG = {
  // Production: Change these values
  endpoint: '/api/analyze', // Your backend endpoint
  enabled: false, // Set to true when backend is ready
};

// Mock analysis for local testing (Claude's analysis style)
const generateMockAnalysis = (inputText, inputSource) => {
  const textLength = inputText?.length || 0;
  const wordCount = inputText?.split(/\s+/).filter(Boolean).length || 0;
  
  // Extract potential keywords from input
  const jdKeywords = {
    finance: ['회계', 'accounting', '재무', 'finance', 'fp&a', '예산', 'budget'],
    pm: ['프로젝트', 'project', 'pmp', 'pmbok', 'agile', '이해관계자'],
    global: ['글로벌', 'global', '영어', 'english', 'bilingual', '해외'],
    tech: ['power bi', 'sql', 'python', '데이터', 'data', '자동화'],
    gaming: ['게임', 'game', 'gaming', '플랫폼', 'platform', 'saas']
  };
  
  const inputLower = (inputText || '').toLowerCase();
  const matchedCategories = {};
  
  Object.entries(jdKeywords).forEach(([category, keywords]) => {
    const matches = keywords.filter(kw => inputLower.includes(kw));
    if (matches.length > 0) {
      matchedCategories[category] = matches;
    }
  });
  
  const categoryCount = Object.keys(matchedCategories).length;
  const baseScore = Math.min(95, Math.max(45, 50 + (categoryCount * 10)));
  
  return {
    timestamp: new Date().toISOString(),
    source: inputSource,
    stats: {
      characters: textLength,
      words: wordCount,
      estimatedReadTime: Math.ceil(wordCount / 200) + ' min'
    },
    fitAnalysis: {
      overallScore: baseScore,
      verdict: baseScore >= 75 ? '높은 적합도' : baseScore >= 55 ? '적합도 양호' : 'Gap 보완 필요',
      matchedCategories: Object.entries(matchedCategories).map(([cat, keywords]) => ({
        category: cat === 'finance' ? '재무/회계' : 
                  cat === 'pm' ? '프로젝트 관리' :
                  cat === 'global' ? '글로벌/언어' :
                  cat === 'tech' ? '기술/데이터' : '게임 산업',
        keywords: keywords,
        score: Math.min(95, 60 + keywords.length * 15)
      })),
      gaps: categoryCount < 3 ? [
        '추가 키워드 매칭 필요',
        '상세 요구사항 확인 권장'
      ] : []
    },
    recommendations: [
      '이력서에서 매칭된 키워드 강조 권장',
      categoryCount >= 3 ? '높은 적합도 - 적극 지원 고려' : 'Gap 분석 후 맞춤 이력서 작성 권장',
      '커버레터에서 관련 경험 상세 기술'
    ],
    rawKeywordsFound: Object.values(matchedCategories).flat(),
    _meta: {
      analysisType: 'mock_local',
      model: 'Claude Analysis Simulation',
      note: '실제 배포 시 LLM API로 대체됩니다.'
    }
  };
};

// Backend API call (for production)
const callAnalysisAPI = async (inputText, inputSource) => {
  if (!LLM_API_CONFIG.enabled) {
    // Local mock mode
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API delay
    return generateMockAnalysis(inputText, inputSource);
  }
  
  // Production API call
  const response = await fetch(LLM_API_CONFIG.endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      text: inputText,
      source: inputSource,
      candidateProfile: {
        name: 'Max Choi',
        background: 'Gaming PM → Finance Transformation',
        experience: '8+ years',
        currentStudy: 'University of Illinois MSA'
      }
    })
  });
  
  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }
  
  return response.json();
};

const InputsTab = () => {
  const fileInputRef = useRef(null);

  const [selectedFile, setSelectedFile] = useState(null);
  const [fileContent, setFileContent] = useState('');
  const [previewUrl, setPreviewUrl] = useState(null);

  const [sourceUrl, setSourceUrl] = useState('');
  const [urlContent, setUrlContent] = useState('');
  const [urlFetching, setUrlFetching] = useState(false);
  
  const [pastedText, setPastedText] = useState('');

  const [analyzing, setAnalyzing] = useState(false);
  const [status, setStatus] = useState(null);

  const [analysisResult, setAnalysisResult] = useState(() => {
    try {
      const raw = localStorage.getItem(ANALYSIS_STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  // Persist analysis result
  useEffect(() => {
    if (!analysisResult) return;
    try {
      localStorage.setItem(ANALYSIS_STORAGE_KEY, JSON.stringify(analysisResult));
    } catch {
      // ignore
    }
  }, [analysisResult]);

  const isAllowedFile = (file) => {
    if (!file) return false;
    const ext = getFileExtension(file.name);
    const mime = file.type || '';
    if (ALLOWED_DOC_EXTENSIONS.includes(ext)) return true;
    if (ALLOWED_IMAGE_EXTENSIONS.includes(ext)) return true;
    if (mime.startsWith('image/')) return true;
    return false;
  };

  const resetInputs = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setSelectedFile(null);
    setFileContent('');
    setPreviewUrl(null);
    setSourceUrl('');
    setUrlContent('');
    setPastedText('');
    setStatus(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const clearAnalysis = () => {
    try {
      localStorage.removeItem(ANALYSIS_STORAGE_KEY);
    } catch {}
    setAnalysisResult(null);
  };

  const handlePickFile = () => fileInputRef.current?.click();

  const readAsText = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ''));
    reader.onerror = () => reject(new Error('파일을 읽는 중 오류가 발생했습니다.'));
    reader.readAsText(file);
  });

  const handleFile = async (file) => {
    setStatus(null);
    if (!file) return;

    if (!isAllowedFile(file)) {
      setStatus({
        type: 'error',
        message: '허용되지 않는 파일 형식입니다.'
      });
      return;
    }

    setSelectedFile(file);

    const ext = getFileExtension(file.name);
    const isImage = (file.type && file.type.startsWith('image/')) || ALLOWED_IMAGE_EXTENSIONS.includes(ext);

    if (isImage) {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      setPreviewUrl(URL.createObjectURL(file));
      setFileContent('[이미지 파일 - 텍스트 분석 불가]');
    } else if (ext === 'txt' || ext === 'md') {
      try {
        const text = await readAsText(file);
        setFileContent(text);
        setStatus({ type: 'success', message: `파일 내용 로드 완료 (${text.length.toLocaleString()}자)` });
      } catch {
        setFileContent('');
        setStatus({ type: 'error', message: '파일 읽기 실패' });
      }
    } else {
      setFileContent(`[${ext.toUpperCase()} 파일 - 텍스트 추출을 위해 내용을 복사하여 붙여넣기 해주세요]`);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    handleFile(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    handleFile(e.dataTransfer?.files?.[0]);
  };

  const handlePaste = (e) => {
    const items = e.clipboardData?.items;
    if (!items) return;
    for (const item of items) {
      if (item.kind === 'file' && item.type.startsWith('image/')) {
        const file = item.getAsFile();
        if (file) {
          handleFile(file);
          e.preventDefault();
        }
        return;
      }
    }
  };

  // Fetch URL content
  const fetchUrlContent = async () => {
    const cleaned = sanitizeUrl(sourceUrl.trim());
    if (!cleaned) {
      setStatus({ type: 'error', message: 'URL 형식이 올바르지 않습니다.' });
      return;
    }

    setUrlFetching(true);
    setStatus({ type: 'info', message: '웹페이지 내용을 가져오는 중...' });

    try {
      const res = await fetch(cleaned);
      const contentType = res.headers.get('content-type') || '';
      const raw = await res.text();

      let extracted = raw;
      if (contentType.includes('text/html') || raw.includes('<html')) {
        const doc = new DOMParser().parseFromString(raw, 'text/html');
        // Remove scripts, styles
        doc.querySelectorAll('script, style, nav, footer, header').forEach(el => el.remove());
        extracted = doc.body?.innerText || '';
      }

      const trimmed = extracted.trim();
      if (trimmed.length > 100) {
        setUrlContent(trimmed);
        setStatus({ type: 'success', message: `웹페이지 내용 가져오기 성공 (${trimmed.length.toLocaleString()}자)` });
      } else {
        setStatus({ type: 'error', message: '유효한 텍스트를 추출하지 못했습니다. 직접 복사하여 붙여넣기 해주세요.' });
      }
    } catch (err) {
      setStatus({ 
        type: 'error', 
        message: 'CORS 차단으로 내용을 가져올 수 없습니다. 페이지 내용을 직접 복사하여 붙여넣기 해주세요.' 
      });
    } finally {
      setUrlFetching(false);
    }
  };

  // Get the best available input text
  const getInputText = () => {
    if (pastedText.trim()) return { text: pastedText.trim(), source: 'pasted_text' };
    if (urlContent.trim()) return { text: urlContent.trim(), source: 'url_fetch' };
    if (fileContent.trim() && !fileContent.startsWith('[')) return { text: fileContent.trim(), source: 'file_upload' };
    return null;
  };

  const canAnalyze = () => {
    const input = getInputText();
    return input && input.text.length >= 50;
  };

  // Main analysis function
  const runAnalysis = async () => {
    const input = getInputText();
    if (!input || input.text.length < 50) {
      setStatus({ type: 'error', message: '분석할 텍스트가 부족합니다. 최소 50자 이상 입력해주세요.' });
      return;
    }

    setAnalyzing(true);
    setStatus({ type: 'info', message: 'AI 분석 중... 잠시만 기다려주세요.' });

    try {
      const result = await callAnalysisAPI(input.text, input.source);
      setAnalysisResult(result);
      setStatus({ type: 'success', message: '분석 완료!' });
    } catch (err) {
      setStatus({ type: 'error', message: `분석 실패: ${err.message}` });
    } finally {
      setAnalyzing(false);
    }
  };

  const copyAnalysis = async () => {
    if (!analysisResult) return;
    try {
      await navigator.clipboard.writeText(JSON.stringify(analysisResult, null, 2));
      setStatus({ type: 'success', message: '분석 결과가 클립보드에 복사되었습니다.' });
    } catch {
      setStatus({ type: 'error', message: '복사 실패' });
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">📎 JD 입력 & AI 분석</h2>
        <p className="text-slate-200">
          Job Description을 파일, URL, 또는 텍스트로 입력하면 AI가 적합도를 분석합니다.
        </p>
        <div className="mt-2 inline-flex items-center gap-2 px-3 py-1 bg-slate-800 rounded-full text-xs">
          <span className={`w-2 h-2 rounded-full ${LLM_API_CONFIG.enabled ? 'bg-emerald-500' : 'bg-blue-500'}`}></span>
          <span className="text-slate-200">
            {LLM_API_CONFIG.enabled ? 'LLM API 연결됨' : '로컬 테스트 모드 (Mock Analysis)'}
          </span>
        </div>
      </div>

      <div className="bg-slate-800/50 border border-slate-600 rounded-xl p-6 space-y-6">
        
        {/* File Upload */}
        <div>
          <label className="block text-sm font-medium text-slate-200 mb-2">📁 파일 업로드</label>
          <div
            tabIndex={0}
            onPaste={handlePaste}
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            className="border-2 border-dashed border-slate-600 rounded-xl p-4 bg-slate-900/40 focus:outline-none focus:border-slate-600"
          >
            <div className="flex items-center justify-between gap-4">
              <div className="text-sm text-slate-200">
                .txt .md .pdf .doc .docx + 이미지 | 드래그&드롭 또는 Ctrl+V
              </div>
              <div className="flex items-center gap-2">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".txt,.md,.pdf,.doc,.docx,image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <button
                  onClick={handlePickFile}
                  className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-sm transition-all"
                >
                  파일 선택
                </button>
              </div>
            </div>
            
            {selectedFile && (
              <div className="mt-3 p-3 bg-slate-800/50 border border-slate-600 rounded-lg flex items-center justify-between">
                <div>
                  <div className="text-white text-sm font-medium">{selectedFile.name}</div>
                  <div className="text-xs text-slate-400">{formatBytes(selectedFile.size)}</div>
                </div>
                {previewUrl && (
                  <img src={previewUrl} alt="preview" className="w-16 h-16 object-cover rounded border border-slate-600" />
                )}
              </div>
            )}
          </div>
        </div>

        {/* URL Input */}
        <div>
          <label className="block text-sm font-medium text-slate-200 mb-2">URL 입력</label>
          <div className="flex gap-2">
            <input
              value={sourceUrl}
              onChange={(e) => setSourceUrl(e.target.value)}
              placeholder="https://careers.example.com/job/12345"
              className="flex-1 bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-slate-200 placeholder-slate-400 focus:border-slate-600 focus:outline-none"
            />
            <button
              onClick={fetchUrlContent}
              disabled={!sourceUrl.trim() || urlFetching}
              className="px-4 py-2 bg-slate-700 hover:bg-slate-600 disabled:bg-slate-800 disabled:text-slate-400 text-white rounded-lg text-sm transition-all whitespace-nowrap"
            >
              {urlFetching ? '가져오는 중...' : '내용 가져오기'}
            </button>
          </div>
          {urlContent && (
            <div className="mt-2 p-2 bg-emerald-900/20/20 border border-emerald-500/50/30 rounded-lg">
              <div className="text-xs text-emerald-400">URL에서 {urlContent.length.toLocaleString()}자 추출됨</div>
            </div>
          )}
        </div>

        {/* Text Paste */}
        <div>
          <label className="block text-sm font-medium text-slate-200 mb-2">📝 텍스트 직접 입력 (권장)</label>
          <textarea
            value={pastedText}
            onChange={(e) => setPastedText(e.target.value)}
            placeholder="Job Description 내용을 여기에 붙여넣으세요...

예시:
[자격요건]
- 3년 이상의 프로젝트 관리 경험
- 영어 커뮤니케이션 가능자
- Power BI, SQL 활용 가능자 우대
..."
            className="w-full h-48 bg-slate-900 border border-slate-600 rounded-lg p-3 text-slate-200 placeholder-slate-400 focus:border-slate-600 focus:outline-none resize-none"
          />
          <div className="flex justify-between mt-1">
            <span className="text-xs text-slate-400">
              {pastedText.length > 0 ? `${pastedText.length.toLocaleString()}자 입력됨` : '최소 50자 이상 입력'}
            </span>
            {pastedText.length > 0 && (
              <button onClick={() => setPastedText('')} className="text-xs text-slate-400 hover:text-slate-200">
                지우기
              </button>
            )}
          </div>
        </div>

        {/* Status */}
        {status && (
          <div className={`p-3 rounded-lg text-sm border ${
            status.type === 'success' ? 'bg-emerald-900/20/30 border-emerald-500/50 text-emerald-400' :
            status.type === 'error' ? 'bg-purple-800/20/30 border-purple-700/50 text-purple-400' :
            'bg-blue-900/30 border-slate-800 text-blue-300'
          }`}>
            {status.message}
          </div>
        )}

        {/* Analyze Button */}
        <div className="pt-4 border-t border-slate-600">
          <div className="flex items-center justify-between gap-4">
            <button
              onClick={resetInputs}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-sm border border-slate-600 transition-all"
            >
              입력 초기화
            </button>
            <button
              onClick={runAnalysis}
              disabled={!canAnalyze() || analyzing}
              className="px-8 py-3 bg-gradient-to-r from-blue-900 to-indigo-700 hover:from-blue-950 hover:to-purple-900 disabled:from-slate-800 disabled:to-slate-700 disabled:cursor-not-allowed text-white font-bold rounded-xl text-lg transition-all shadow-lg hover:shadow-blue-500/25"
            >
              {analyzing ? '분석 중...' : '분석하기'}
            </button>
          </div>
          <div className="text-center mt-2 text-xs text-slate-400">
            {canAnalyze() 
              ? `분석 준비 완료 (${getInputText()?.text.length.toLocaleString()}자)`
              : '텍스트를 입력해주세요 (파일/URL/직접입력 중 택1)'}
          </div>
        </div>
      </div>

      {/* Analysis Result */}
      <div className="bg-slate-800/50 border border-slate-600 rounded-xl p-6 space-y-4">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div>
            <h3 className="text-lg font-bold text-white">분석 결과</h3>
            <div className="text-xs text-slate-400">
              {analysisResult ? `마지막 분석: ${new Date(analysisResult.timestamp).toLocaleString()}` : '아직 분석 결과가 없습니다.'}
            </div>
          </div>
          {analysisResult && (
            <div className="flex items-center gap-2">
              <button
                onClick={copyAnalysis}
                className="px-3 py-1 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-sm transition-all"
              >
                복사
              </button>
              <button
                onClick={clearAnalysis}
                className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-sm border border-slate-600 transition-all"
              >
                삭제
              </button>
            </div>
          )}
        </div>

        {analysisResult ? (
          <div className="space-y-6">
            {/* Overall Score */}
            <div className="text-center p-6 bg-gradient-to-br from-slate-900 to-slate-900 rounded-xl">
              <div className={`text-6xl font-bold ${
                analysisResult.fitAnalysis.overallScore >= 75 ? 'text-emerald-400' :
                analysisResult.fitAnalysis.overallScore >= 55 ? 'text-blue-400' : 'text-blue-400'
              }`}>
                {analysisResult.fitAnalysis.overallScore}%
              </div>
              <div className="text-xl mt-2">{analysisResult.fitAnalysis.verdict}</div>
              <div className="text-sm text-slate-400 mt-1">
                {analysisResult.stats.words.toLocaleString()} 단어 분석 • {analysisResult.stats.estimatedReadTime} 읽기
              </div>
            </div>

            {/* Category Breakdown */}
            {analysisResult.fitAnalysis.matchedCategories.length > 0 && (
              <div>
                <h4 className="font-medium text-white mb-3">카테고리별 매칭</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {analysisResult.fitAnalysis.matchedCategories.map((cat, i) => (
                    <div key={i} className="p-3 bg-slate-800/50 border border-slate-600 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-white">{cat.category}</span>
                        <span className={`font-bold ${cat.score >= 75 ? 'text-emerald-400' : 'text-blue-400'}`}>
                          {cat.score}%
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {cat.keywords.map((kw, j) => (
                          <span key={j} className="px-2 py-0.5 bg-blue-900/40 border border-slate-800/50 rounded text-xs text-blue-400">
                            {kw}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Recommendations */}
            <div>
              <h4 className="font-medium text-white mb-3">추천 사항</h4>
              <div className="space-y-2">
                {analysisResult.recommendations.map((rec, i) => (
                  <div key={i} className="flex items-start gap-2 text-slate-200 text-sm">
                    <span className="text-blue-400 mt-0.5">→</span>
                    {rec}
                  </div>
                ))}
              </div>
            </div>

            {/* Gaps if any */}
            {analysisResult.fitAnalysis.gaps.length > 0 && (
              <div>
                <h4 className="font-medium text-blue-400 mb-3">보완 필요 영역</h4>
                <div className="space-y-2">
                  {analysisResult.fitAnalysis.gaps.map((gap, i) => (
                    <div key={i} className="flex items-center gap-2 text-slate-200 text-sm">
                      <span className="text-blue-400">•</span>
                      {gap}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Meta info */}
            <div className="pt-4 border-t border-slate-600 text-xs text-slate-400">
              <div>분석 모델: {analysisResult._meta?.model || 'Unknown'}</div>
              <div>소스: {analysisResult.source}</div>
              {analysisResult._meta?.note && (
                <div className="mt-1 text-blue-400/70">{analysisResult._meta.note}</div>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center py-12 text-slate-400">
            <div className="text-4xl mb-4 text-slate-400">?</div>
            <div>JD를 입력하고 "분석하기" 버튼을 눌러주세요.</div>
            <div className="text-sm mt-2">파일 업로드, URL, 또는 직접 텍스트 입력 가능</div>
          </div>
        )}
      </div>
    </div>
  );
};


// ===== NARRATIVE TAB =====
const NarrativeTab = () => {
  const [activeSection, setActiveSection] = useState('evolution');
  const { language, t } = useLanguage();
  
  // YouTube video ID - update this with your actual video
  const YOUTUBE_VIDEO_ID = 'YOUR_VIDEO_ID'; // Replace with actual YouTube video ID
  const hasVideo = YOUTUBE_VIDEO_ID !== 'YOUR_VIDEO_ID';

  const careerEvolution = language === 'ko' ? {
    past: {
      phase: "Phase 1",
      title: "한국 게임의 글로벌화",
      period: "2017 - 2023",
      icon: "🎮",
      description: "글로벌 시장을 향한 한국 게임 프로젝트의 현지화 및 론칭을 리드했습니다.",
      highlights: [
        "SINoALICE: 150개국 글로벌 론칭 준비",
        "PURPLE: 38개국 동시 론칭, 13M+ 사전예약 달성 (리니지2M)",
        "Lineage2M: 대만/일본/미주/유럽 시장 진출",
        "6개 언어 로컬라이제이션 & 문화적 현지화"
      ],
      insight: "게임이라는 '제품'을 글로벌 시장에 맞게 조율하는 과정에서, 각 시장의 규제, 문화, 사용자 특성을 깊이 이해하게 되었습니다."
    },
    present: {
      phase: "Phase 2",
      title: "한국 기업의 글로벌화",
      period: "2024 - Present",
      icon: "🌍",
      description: "제품을 넘어, 기업 자체가 글로벌하게 운영될 수 있도록 지원하는 역할로 전환하고 있습니다.",
      highlights: [
        "University of Illinois MSA: 글로벌 회계/재무 역량 강화",
        "Big 4 Advisory 타겟: 한국 기업의 해외 진출 자문",
        "Fractional CFO 비전: 스타트업의 글로벌 재무 전략",
        "Cross-border Transaction 전문성 구축"
      ],
      insight: "생성형 AI의 등장으로 더 작은 팀으로도 법인 설립과 글로벌 운영이 가능해졌습니다. 이 변화의 시대에 기업들이 글로벌 시장에 진출할 수 있도록 돕고자 합니다."
    }
  } : {
    past: {
      phase: "Phase 1",
      title: "Globalizing Korean Games",
      period: "2017 - 2023",
      icon: "🎮",
      description: "Led localization and global launches of Korean game projects targeting international markets.",
      highlights: [
        "SINoALICE: Prepared global launch across 150 countries",
        "PURPLE: Simultaneous 38-country launch, 13M+ pre-registrations (L2M)",
        "Lineage2M: Market expansion to Taiwan/Japan/Americas/Europe",
        "6-language localization & cultural adaptation"
      ],
      insight: "Through adapting game 'products' for global markets, I gained deep understanding of each market's regulations, culture, and user characteristics."
    },
    present: {
      phase: "Phase 2",
      title: "Globalizing Korean Enterprises",
      period: "2024 - Present",
      icon: "🌍",
      description: "Transitioning to roles that help enterprises operate globally, beyond just products.",
      highlights: [
        "University of Illinois MSA: Building global accounting/finance capabilities",
        "Big 4 Advisory target: Advising Korean companies on overseas expansion",
        "Fractional CFO vision: Global finance strategy for startups",
        "Building cross-border transaction expertise"
      ],
      insight: "With generative AI, even small teams can establish entities and operate globally. I aim to help companies enter global markets in this era of change."
    }
  };

  const transitionDriver = language === 'ko' ? {
    title: "왜 이 전환인가?",
    
    points: [
      {
        title: "생성형 AI는 Great Equalizer",
        description: "AI 도구를 최적으로 활용한다면 소규모 팀으로도 글로벌 퀄리티의 제품과 서비스를 제공할 수 있습니다. 게임 업계에서는 라리안 스튜디오의 '발더스 게이트 3', 샌드폴 인터랙티브의 '클레르 옵스퀴르: 33원정대' 등이 대표적인 성공 케이스입니다. 이러한 현상은 소프트웨어 기반 업계를 넘어, 로보틱스의 확대와 함께 물리 기반 산업으로도 확장될 것입니다."
      },
      {
        title: "한국 스타트업의 글로벌 기회",
        description: "한국 스타트업 해외 진출률은 7%로 싱가포르(90%), 이스라엘(80%) 대비 현저히 낮습니다. 연간 8천만 명씩 성장하는 글로벌 시장은 기회이며, 대한민국 정부도 $34B 규모의 글로벌화 정책을 추진 중입니다. 변화는 기회의 틈을 엽니다. AI라는 새로운 패러다임으로 전 세계가 급변하는 지금, 이 틈을 활용한다면 글로벌 사업을 일으킬 기회가 있습니다."
      },
      {
        title: "사업 + 회계/재무 역량의 시너지",
        description: "사업PM으로서 38개국 론칭 경험에서 쌓은 시장 이해도와 프로젝트 관리 전문성에 회계/재무 역량을 더하고자 합니다. 프로젝트 관리를 넘어 회사의 창립과 성장, 엑시트까지 글로벌 자본 조달과 운영, 의사결정의 전 과정을 지원하겠습니다."
      }
    ]
  } : {
    title: "Why This Transition?",
    
    points: [
      {
        title: "Generative AI as the Great Equalizer",
        description: "With optimal AI utilization, small teams can deliver global-quality products and services. In gaming, Larian Studios' 'Baldur's Gate 3' and Sandfall Interactive's 'Clair Obscur: Expedition 33' exemplify this success. This phenomenon will extend beyond software to physical industries as robotics advances."
      },
      {
        title: "Global Opportunity for Korean Startups",
        description: "Only 7% of Korean startups expand overseas vs. 90% in Singapore and 80% in Israel. With 80M+ annual global population growth, the Korean government is backing $34B in globalization initiatives. Change opens gaps of opportunity. As the world rapidly transforms with AI as a new paradigm, those who leverage these gaps can build global businesses."
      },
      {
        title: "Synergy of Business + Finance Expertise",
        description: "Building on market insights and project management expertise from 38-country launches as a Business PM, I aim to add accounting/finance capabilities. Beyond project management, I will support the entire lifecycle—from company formation to growth to exit—including global capital raising, operations, and strategic decision-making."
      }
    ]
  };

  const workingStyle = language === 'ko' ? [
    {
      
      title: "능동적 파악",
      subtitle: "Proactive Discovery",
      description: "지시를 기다리지 않고, 상황과 맥락을 먼저 파악합니다. 문제가 발생하기 전에 리스크를 식별하고, 기회를 선제적으로 포착합니다.",
      example: "Amazon Games 딜 검토 시, 요청 전 경쟁사 분석 및 시장 데이터를 선제적으로 준비"
    },
    {
      
      title: "시스템 기반 업무",
      subtitle: "System-Driven Approach",
      description: "반복되는 업무는 시스템화하고 자동화합니다. 이를 통해 팀 전체의 효율성을 높이고, 본질적인 의사결정에 집중할 수 있는 환경을 만듭니다.",
      example: "Power Automate로 주간 리포트 자동화 → 주 10시간 이상 절감"
    },
    {
      
      title: "과학적 의사결정",
      subtitle: "Hypothesis-Driven Decisions",
      description: "중요한 결정은 신중히, 그렇지 않은 결정은 가설을 세우고 빠르게 실행합니다. 데이터를 기반으로 이터레이션하며 최적의 답을 찾아갑니다.",
      example: "CBT 운영 프레임워크 설계 → 데이터 기반 게임 밸런스 조정"
    },
    {
      
      title: "미션 기반 장기 사고",
      subtitle: "Mission-Oriented Long-term View",
      description: "단기적 성과에 매몰되지 않고, 중장기적 관점에서 사안을 바라봅니다. 복잡하고 오랜 시간이 걸리는 문제를 체계적으로 해결합니다.",
      example: "PURPLE 38개국 론칭: 2년간의 로드맵 수립 및 단계적 실행"
    },
    {
      
      title: "협업과 책임감",
      subtitle: "Collaboration & Accountability",
      description: "팀원들과의 협업을 중시하며, 맡은 바에 대해 프로페셔널한 수준의 결과물을 책임지고 완수합니다.",
      example: "300+ 이해관계자 조율, PDMO 위원회 설립 및 운영"
    }
  ] : [
    {
      
      title: "Proactive Discovery",
      subtitle: "능동적 파악",
      description: "Don't wait for instructions—understand the situation first. Identify risks before they occur and proactively capture opportunities.",
      example: "For Amazon Games deal review, proactively prepared competitor analysis and market data before being asked"
    },
    {
      
      title: "System-Driven Approach",
      subtitle: "시스템 기반 업무",
      description: "Systematize and automate repetitive tasks. This increases team efficiency and creates space to focus on essential decisions.",
      example: "Automated weekly reports with Power Automate → 10+ hours/week saved"
    },
    {
      
      title: "Hypothesis-Driven Decisions",
      subtitle: "과학적 의사결정",
      description: "Important decisions require deliberation; others need quick hypothesis-testing execution. Iterate based on data to find optimal answers.",
      example: "CBT operation framework design → Data-driven game balance adjustments"
    },
    {
      
      title: "Mission-Oriented Long-term View",
      subtitle: "미션 기반 장기 사고",
      description: "Don't get lost in short-term gains. View matters from a mid-to-long-term perspective. Systematically solve complex, time-intensive problems.",
      example: "PURPLE 38-country launch: 2-year roadmap planning and staged execution"
    },
    {
      
      title: "Collaboration & Accountability",
      subtitle: "협업과 책임감",
      description: "Value teamwork and take professional responsibility for delivering quality outcomes on commitments.",
      example: "Coordinated 300+ stakeholders, established and operated PDMO committee"
    }
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">{language === 'ko' ? '커리어 내러티브' : 'Career Narrative'}</h2>
        <p className="text-slate-200">
          {language === 'ko' 
            ? '게임의 글로벌화에서 기업의 글로벌화로 — 그리고 함께 일하는 방식'
            : 'From globalizing games to globalizing enterprises — and how I work'
          }
        </p>
      </div>

      {/* Section Toggle */}
      <div className="flex justify-center gap-4">
        <button
          onClick={() => setActiveSection('evolution')}
          className={`px-6 py-3 rounded-xl font-medium transition-all ${
            activeSection === 'evolution'
              ? 'bg-blue-600 text-white'
              : 'bg-slate-800 text-slate-200 hover:text-white'
          }`}
        >
          {language === 'ko' ? '커리어 여정' : 'Career Journey'}
        </button>
        <button
          onClick={() => setActiveSection('working')}
          className={`px-6 py-3 rounded-xl font-medium transition-all ${
            activeSection === 'working'
              ? 'bg-blue-600 text-white'
              : 'bg-slate-800 text-slate-200 hover:text-white'
          }`}
        >
          {language === 'ko' ? '업무 스타일' : 'Work Style'}
        </button>
      </div>

      {/* Career Evolution Section */}
      {activeSection === 'evolution' && (
        <div className="space-y-8">
          {/* Timeline */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Phase 1 */}
            <div className="bg-gradient-to-br from-indigo-900/30 to-purple-800/20 border border-indigo-600/30 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center text-xl">{careerEvolution.past.icon}</div>
                <div>
                  <div className="text-xs text-purple-400 font-medium">{careerEvolution.past.phase}</div>
                  <h3 className="text-xl font-bold text-white">{careerEvolution.past.title}</h3>
                  <div className="text-sm text-slate-200">{careerEvolution.past.period}</div>
                </div>
              </div>
              <p className="text-slate-200 mb-4">{careerEvolution.past.description}</p>
              <ul className="space-y-2 mb-4">
                {careerEvolution.past.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-200">
                    <span className="text-purple-400 mt-1">→</span>
                    {h}
                  </li>
                ))}
              </ul>
              <div className="p-3 bg-gradient-to-r from-purple-900/50 to-indigo-900/40 rounded-lg border border-purple-700/50">
                <div className="text-xs text-purple-300 font-medium mb-1">Key Insight</div>
                <p className="text-sm text-slate-200">{careerEvolution.past.insight}</p>
              </div>
            </div>

            {/* Phase 2 */}
            <div className="bg-gradient-to-br from-blue-900/30 to-blue-700/20 border border-blue-500/40 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-xl">{careerEvolution.present.icon}</div>
                <div>
                  <div className="text-xs text-blue-400 font-medium">{careerEvolution.present.phase}</div>
                  <h3 className="text-xl font-bold text-white">{careerEvolution.present.title}</h3>
                  <div className="text-sm text-slate-200">{careerEvolution.present.period}</div>
                </div>
              </div>
              <p className="text-slate-200 mb-4">{careerEvolution.present.description}</p>
              <ul className="space-y-2 mb-4">
                {careerEvolution.present.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-200">
                    <span className="text-blue-400 mt-1">→</span>
                    {h}
                  </li>
                ))}
              </ul>
              <div className="p-3 bg-gradient-to-r from-blue-900/50 to-indigo-900/40 rounded-lg border border-blue-700/50">
                <div className="text-xs text-blue-400 font-medium mb-1">Key Insight</div>
                <p className="text-sm text-slate-200">{careerEvolution.present.insight}</p>
              </div>
            </div>
          </div>

          {/* Transition Arrow */}
          <div className="flex justify-center">
            <div className="bg-slate-800/50 border border-slate-600 rounded-xl px-8 py-4">
              <div className="flex items-center gap-4">
                <span className="text-3xl">🎮</span>
                <div className="flex flex-col items-center">
                  <div className="text-slate-200 text-sm">Product <span className="text-white font-bold">→</span> Enterprise</div>
                  <div className="text-2xl text-white">→</div>
                </div>
                <span className="text-3xl">🌍</span>
              </div>
            </div>
          </div>

          {/* Why This Transition */}
          <div className="bg-slate-800/50 border border-slate-600 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-slate-700 rounded-xl flex items-center justify-center text-white font-bold text-sm">WHY</div>
              <h3 className="text-xl font-bold text-white">{transitionDriver.title}</h3>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {transitionDriver.points.map((point, i) => (
                <div key={i} className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                  <h4 className="font-medium text-blue-400 mb-2">{point.title}</h4>
                  <p className="text-sm text-slate-200">{point.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Working Style Section */}
      {activeSection === 'working' && (
        <div className="space-y-8">
          {/* Video Section */}
          <div className="bg-slate-800/50 border border-slate-600 rounded-xl p-6">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              🎬 홍익과 함께하는 업무 체감
            </h3>
            
            {hasVideo ? (
              <div className="aspect-video rounded-lg overflow-hidden bg-slate-900">
                <iframe
                  src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}`}
                  title="Max Choi Introduction"
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : (
              <div className="aspect-video rounded-lg bg-slate-900 border-2 border-dashed border-slate-600 flex flex-col items-center justify-center">
                <span className="text-6xl mb-4">🎥</span>
                <p className="text-slate-200 mb-2">소개 영상 준비 중</p>
                <p className="text-sm text-slate-400">2분 분량의 자기소개 영상이 곧 업로드됩니다.</p>
                <p className="text-xs text-slate-400 mt-4 font-mono">
                  // YOUTUBE_VIDEO_ID를 실제 영상 ID로 교체하세요
                </p>
              </div>
            )}
          </div>

          {/* Working Style Cards */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6 text-center">
              💼 저와 함께 일하면 이런 경험을 하게 됩니다
            </h3>
            <div className="space-y-4">
              {workingStyle.map((style, i) => (
                <div 
                  key={i}
                  className="bg-slate-800/50 border border-slate-600 rounded-xl p-6 hover:border-slate-600/50 transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-900 to-indigo-700 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                      {style.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2 flex-wrap">
                        <h4 className="font-bold text-white text-lg">{style.title}</h4>
                        <span className="text-xs text-blue-400 bg-blue-900/30 px-2 py-1 rounded-full">
                          {style.subtitle}
                        </span>
                      </div>
                      <p className="text-slate-200 mb-3">{style.description}</p>
                      <div className="flex items-start gap-2 text-sm">
                        <span className="text-emerald-400 flex-shrink-0">Example:</span>
                        <span className="text-slate-200">{style.example}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Summary Quote */}
          <div className="bg-gradient-to-r from-blue-900/30 via-purple-900/30 to-blue-900/30 border border-blue-500/30 rounded-xl p-8 text-center">
            <blockquote className="text-xl text-white font-medium mb-4">
              {language === 'ko' ? (
                <>
                  "Envision. Analyze. Excel.<br />
                  맥스라는 브랜드가 남기는 발자국으로 증명하겠습니다."
                </>
              ) : (
                <>
                  "Envision. Analyze. Excel.<br />
                  I'll prove it through the footprints the Max brand leaves behind."
                </>
              )}
            </blockquote>
            <cite className="text-slate-200">— Max Choi's Work Philosophy</cite>
          </div>
        </div>
      )}
    </div>
  );
};


// ===== CONTACT TAB =====
const CONTACT_EMAIL = 'hchoi41@illinois.edu';

const ContactTab = () => {
  const { language, t } = useLanguage();
  const [formData, setFormData] = useState({
    senderName: '',
    senderEmail: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState(null);
  const [sending, setSending] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const canSubmit = () => {
    return formData.senderName.trim() &&
           formData.senderEmail.trim() &&
           validateEmail(formData.senderEmail) &&
           formData.subject.trim() &&
           formData.message.trim().length >= 10;
  };

  // Method 1: mailto link (works everywhere, opens email client)
  const handleMailto = () => {
    const subject = encodeURIComponent(`[Portfolio] ${formData.subject}`);
    const body = encodeURIComponent(
      `${language === 'ko' ? '보낸 사람' : 'From'}: ${formData.senderName}\n` +
      `${language === 'ko' ? '이메일' : 'Email'}: ${formData.senderEmail}\n\n` +
      `---\n\n${formData.message}`
    );
    window.open(`mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`, '_blank');
    setStatus({ type: 'info', message: language === 'ko' ? '이메일 클라이언트가 열렸습니다. 발송을 완료해주세요.' : 'Email client opened. Please complete sending.' });
  };

  // Method 2: Copy to clipboard (fallback)
  const handleCopy = async () => {
    const emailContent = 
      `${language === 'ko' ? '수신' : 'To'}: ${CONTACT_EMAIL}\n` +
      `${language === 'ko' ? '제목' : 'Subject'}: [Portfolio] ${formData.subject}\n\n` +
      `${language === 'ko' ? '보낸 사람' : 'From'}: ${formData.senderName}\n` +
      `${language === 'ko' ? '이메일' : 'Email'}: ${formData.senderEmail}\n\n` +
      `---\n\n${formData.message}`;
    
    try {
      await navigator.clipboard.writeText(emailContent);
      setStatus({ type: 'success', message: '이메일 내용이 클립보드에 복사되었습니다. 이메일 앱에 붙여넣기 해주세요.' });
    } catch {
      setStatus({ type: 'error', message: '복사 실패. 직접 내용을 복사해주세요.' });
    }
  };

  // Method 3: Backend API (for future implementation)
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!canSubmit()) {
      setStatus({ type: 'error', message: '모든 필드를 올바르게 입력해주세요.' });
      return;
    }

    // For now, use mailto as primary method
    // In production, you can replace this with actual API call:
    /*
    setSending(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: CONTACT_EMAIL, // Fixed recipient
          from: formData.senderEmail,
          name: formData.senderName,
          subject: formData.subject,
          message: formData.message
        })
      });
      
      if (response.ok) {
        setStatus({ type: 'success', message: '메시지가 성공적으로 전송되었습니다!' });
        setFormData({ senderName: '', senderEmail: '', subject: '', message: '' });
      } else {
        throw new Error('Send failed');
      }
    } catch (err) {
      setStatus({ type: 'error', message: '전송 실패. 다시 시도해주세요.' });
    } finally {
      setSending(false);
    }
    */
    
    handleMailto();
  };

  const resetForm = () => {
    setFormData({ senderName: '', senderEmail: '', subject: '', message: '' });
    setStatus(null);
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">연락하기</h2>
        <p className="text-slate-200">
          Max Choi에게 메시지를 보내세요. 채용 문의, 협업 제안, 피드백 등 환영합니다!
        </p>
      </div>

      {/* Contact Info Card */}
      <div className="bg-gradient-to-br from-blue-900/30 to-indigo-900/30 border border-blue-500/40 rounded-xl p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-700 to-purple-800 rounded-full flex items-center justify-center text-3xl">
              
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">최홍익 (Max Choi)</h3>
              <p className="text-blue-400">Gaming PM → Finance Transformation</p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-slate-200">
              <span className="text-xs text-slate-400 w-12">Email</span>
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-blue-400 hover:underline">
                {CONTACT_EMAIL}
              </a>
            </div>
            <div className="flex items-center gap-2 text-slate-200">
              <span className="text-xs text-slate-400 w-12">LinkedIn</span>
              <a href="https://linkedin.com/in/hongik-max-choi" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                linkedin.com/in/hongik-max-choi
              </a>
            </div>
            <div className="flex items-center gap-2 text-slate-200">
              <span className="text-xs text-slate-400 w-12">Location</span>
              <span>Seoul, South Korea</span>
            </div>
          </div>
        </div>
      </div>

      {/* Email Form */}
      <form onSubmit={handleSubmit} className="bg-slate-800/50 border border-slate-600 rounded-xl p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-white">📝 메시지 작성</h3>
          <div className="text-xs text-slate-400">
            수신: <span className="text-blue-400 font-mono">{CONTACT_EMAIL}</span> (고정)
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-200 mb-2">
              이름 <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              name="senderName"
              value={formData.senderName}
              onChange={handleChange}
              placeholder="홍길동"
              className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 text-slate-200 placeholder-slate-400 focus:border-slate-600 focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-200 mb-2">
              이메일 <span className="text-red-400">*</span>
            </label>
            <input
              type="email"
              name="senderEmail"
              value={formData.senderEmail}
              onChange={handleChange}
              placeholder="your@email.com"
              className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 text-slate-200 placeholder-slate-400 focus:border-slate-600 focus:outline-none"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-200 mb-2">
            제목 <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="문의 제목을 입력해주세요"
            className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 text-slate-200 placeholder-slate-400 focus:border-slate-600 focus:outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-200 mb-2">
            메시지 <span className="text-red-400">*</span>
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="안녕하세요! ... (최소 10자 이상 입력해주세요)"
            rows={6}
            className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 text-slate-200 placeholder-slate-400 focus:border-slate-600 focus:outline-none resize-none"
            required
          />
          <div className="flex justify-between mt-1">
            <span className={`text-xs ${formData.message.length >= 10 ? 'text-emerald-400' : 'text-slate-400'}`}>
              {formData.message.length}자 입력됨 {formData.message.length < 10 && '(최소 10자)'}
            </span>
          </div>
        </div>

        {/* Status Message */}
        {status && (
          <div className={`p-4 rounded-lg text-sm border ${
            status.type === 'success' ? 'bg-emerald-900/20/30 border-emerald-500/50 text-emerald-400' :
            status.type === 'error' ? 'bg-purple-800/20/30 border-purple-700/50 text-purple-400' :
            'bg-blue-900/30 border-slate-800 text-blue-300'
          }`}>
            {status.message}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-600">
          <button
            type="submit"
            disabled={!canSubmit() || sending}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-900 to-indigo-700 hover:from-blue-950 hover:to-purple-900 disabled:from-slate-800 disabled:to-slate-700 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-blue-500/25"
          >
            {sending ? 'Sending...' : 'Send Email'}
          </button>
          <button
            type="button"
            onClick={handleCopy}
            disabled={!canSubmit()}
            className="px-6 py-3 bg-slate-700 hover:bg-slate-600 disabled:bg-slate-800 disabled:text-slate-400 text-white rounded-xl transition-all"
          >
            내용 복사
          </button>
          <button
            type="button"
            onClick={resetForm}
            className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl border border-slate-600 transition-all"
          >
            초기화
          </button>
        </div>

        <div className="text-xs text-slate-400 text-center">
          "이메일 보내기" 클릭 시 기본 이메일 앱이 열립니다. 
          앱이 없으면 "내용 복사" 후 직접 이메일을 발송해주세요.
        </div>
      </form>

      {/* FAQ */}
      <div className="bg-slate-800/50 border border-slate-600 rounded-xl p-6">
        <div className="space-y-4">
          <div>
            <div className="font-medium text-blue-400 mb-1">어떤 문의가 가능한가요?</div>
            <div className="text-sm text-slate-200">
              채용 제안, 프로젝트 협업, 커리어 상담, 포트폴리오 피드백 등 어떤 내용이든 환영합니다.
            </div>
          </div>
          <div>
            <div className="font-medium text-blue-400 mb-1">답변은 얼마나 걸리나요?</div>
            <div className="text-sm text-slate-200">
              보통 24-48시간 내에 답변드리지만, 상황에 따라 조금 더 걸릴 수 있습니다.
            </div>
          </div>
          <div>
            <div className="font-medium text-blue-400 mb-1">LinkedIn으로도 연락 가능한가요?</div>
            <div className="text-sm text-slate-200">
              네, LinkedIn 메시지도 확인합니다. 위의 LinkedIn 링크를 통해 연결 요청해주세요.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


// ===== MAIN APP =====
const MaxPortfolio = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [language, setLanguage] = useState('ko');
  
  const t = translations[language];
  
  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <Navigation activeTab={activeTab} setActiveTab={setActiveTab} language={language} setLanguage={setLanguage} />
        
        <main className="max-w-6xl mx-auto px-4 py-8">
          {activeTab === 'overview' && <OverviewTab />}
          {activeTab === 'narrative' && <NarrativeTab />}
          {activeTab === 'talents' && <TalentsTab />}
          {activeTab === 'skills' && <SkillsTab />}
          {activeTab === 'positions' && <PositionsTab />}
          {activeTab === 'inputs' && <InputsTab />}
          {activeTab === 'contact' && <ContactTab />}
        </main>
        
        <footer className="border-t border-slate-700 py-6 text-center text-slate-400 text-sm">
          {t.footer.builtWith} <span className="text-blue-400">Claude</span> + <span className="text-emerald-400">ChatGPT</span> + <span className="text-purple-400">Gemini</span>
        </footer>
      </div>
    </LanguageContext.Provider>
  );
};

export default MaxPortfolio;
