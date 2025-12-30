# HANDOFF.md - Claude Code 개발 컨텍스트

> 이 문서는 Claude Code가 프로젝트를 이해하고 개발을 이어가기 위한 컨텍스트입니다.

---

## 🎯 프로젝트 개요

**Max Choi Portfolio** - 커리어 전환 포트폴리오 웹사이트

| 항목 | 내용 |
|------|------|
| **소유자** | Max Choi (최홍익) |
| **목적** | Gaming PM → Finance Transformation 커리어 전환 |
| **현재 상태** | Frontend v5 완성, Backend/RAG 미구현 |

---

## 📁 현재 파일 구조

```
frontend/
└── src/
    └── App.jsx          # 현재 ~2,800줄 단일 파일 (분리 필요)
```

### App.jsx 내부 구조

```jsx
// 1. Imports (React, Lucide icons)
// 2. Translations (KO/EN) - lines 10-220
// 3. Talents Data - lines 228-265
// 4. Skills Data - lines 270-420
// 5. Language Context - lines 430-450
// 6. Components:
//    - Header (탭 네비게이션)
//    - OverviewTab
//    - NarrativeTab  
//    - TalentsTab (재능→역량→결과물 Flow)
//    - SkillsTab
//    - FitScoreTab
//    - JDAnalysisTab
//    - ContactTab
// 7. Main App Component
```

---

## 🔧 기술 스택

### Frontend (현재)
- **React 18** - hooks (useState, useContext, useEffect)
- **Tailwind CSS** - dark mode (slate 기반)
- **Lucide React** - 아이콘

### Backend (구현 예정)
- **Python FastAPI** - REST API
- **Endpoints 필요:**
  - `POST /api/email` - 이메일 전송
  - `POST /api/jd-analysis` - JD 분석 (RAG)

### RAG Pipeline (구현 예정)
- **Vector DB:** Chroma (로컬) or Pinecone (클라우드)
- **Embedding:** OpenAI or Cohere
- **LLM:** Claude API
- **Training Data:** Max의 이력서, 경력, 스킬 정보

---

## 🎨 디자인 시스템

### 색상
```css
/* Primary */
--slate-900: #0f172a;  /* 배경 */
--slate-800: #1e293b;  /* 카드 배경 */
--slate-600: #475569;  /* 보더 */
--slate-200: #e2e8f0;  /* 텍스트 */

/* Accent */
--blue-500: #3b82f6;   /* 링크, 강조 */
--blue-400: #60a5fa;   /* 호버 */
--emerald-500: #10b981; /* 성공 */
--yellow-500: #eab308;  /* 경고 */
```

### 컴포넌트 패턴
```jsx
// 카드 스타일
className="bg-slate-800/50 border border-slate-600 rounded-xl p-6"

// 버튼 스타일
className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white"

// 입력 필드
className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-3"
```

---

## 📋 주요 기능 상세

### 1. 바이링궐 (KO/EN)
- `LanguageContext`로 전역 상태 관리
- `translations` 객체에 모든 텍스트
- 우상단 토글 버튼으로 전환

### 2. 7개 탭
| 탭 | 설명 | 특이사항 |
|---|---|---|
| Overview | 프로필, 성과 지표 | 모달 (38개국, 13M+ 등) |
| 내러티브 | 커리어 스토리 | Phase 1→2 전환 |
| 재능 분석 | 재능→역량→결과물 | Flow diagram |
| 보유 기술 | 40개 스킬 | 카테고리별 분류 |
| 직무 적합도 | 타겟 역할 분석 | 점수 시각화 |
| JD 분석 | JD 붙여넣기 → 분석 | **RAG 연동 필요** |
| 연락하기 | 이메일 폼 | **Backend 필요** |

### 3. JD 분석 (현재 vs 목표)
**현재:** 클라이언트 사이드 키워드 매칭만
```jsx
// 단순 키워드 검색
const found = skills.filter(skill => 
  jdText.toLowerCase().includes(skill.toLowerCase())
);
```

**목표:** RAG 기반 분석
```
1. User pastes JD
2. JD → Embedding
3. Vector search (Max's achievements/skills)
4. LLM generates: 적합도 점수 + 갭 분석 + 추천
```

---

## 🚀 개발 로드맵

### Phase 1: 프로젝트 구조화
- [ ] App.jsx → 컴포넌트 분리
- [ ] Vite 설정
- [ ] Tailwind 설정
- [ ] 로컬 개발 환경 확인

### Phase 2: 배포
- [ ] Vercel 연동
- [ ] 도메인 설정 (선택)
- [ ] CI/CD 파이프라인

### Phase 3: Backend
- [ ] FastAPI 기본 구조
- [ ] 이메일 API (SendGrid or Resend)
- [ ] Railway or Vercel Serverless 배포

### Phase 4: RAG
- [ ] Training data 준비 (achievements.json, skills.json)
- [ ] Embedding 생성
- [ ] Vector store 구축
- [ ] Query pipeline
- [ ] JD 분석 API 연동

---

## 📝 Max의 핵심 정보 (RAG Training용)

### 프로필
- **이름:** 최홍익 (Max Choi)
- **현재:** UIUC MS Accountancy (GPA 3.84)
- **목표:** Big 4 Advisory (FAAS/CMAAS), FP&A, ERP PM

### 주요 성과
1. PURPLE 플랫폼 38개국 론칭 ($3M+ 규모)
2. Amazon Games M&A 딜 지원 (쓰론앤리버티)
3. 리니지2M 사전예약 13M+ (PURPLE + L2M PC)
4. 300+ 이해관계자 관리
5. 프로세스 자동화 (주 10시간+ 절감)

### 스킬
- **PM:** PMBOK, Agile, Jira, Confluence
- **Data:** SQL, Python, R, Power BI, Tableau
- **Finance:** Financial Modeling, Valuation, Accounting
- **Language:** Korean (Native), English (Fluent)

---

## ⚠️ 주의사항

1. **Fabrication 금지** - 모든 내용은 실제 Max의 경력에 기반
2. **스타일 일관성** - Tailwind slate 테마 유지
3. **반응형** - 모바일/데스크톱 모두 지원
4. **접근성** - 적절한 contrast ratio 유지 (6.5:1+)

---

## 🔗 참고 링크

- LinkedIn: https://linkedin.com/in/hongik-max-choi
- Email: hchoi41@illinois.edu
