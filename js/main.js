/**
 * ==========================================================================
 * 정윤수 개인 포트폴리오 웹사이트 메인 스크립트 (js/main.js)
 * - 기술 스택: 순수 Vanilla JavaScript (외부 프레임워크/라이브러리 일절 배제)
 * - 주요 기능:
 *   1. 부드러운 메뉴 이동 및 상단 고정 네비게이션 스크롤 감지
 *   2. IntersectionObserver 기반 섹션 감지 및 활성 메뉴 상태 갱신
 *   3. 맨 위로 이동 (Back-to-top) 플로팅 버튼
 *   4. 프로젝트 4개 카드 상세 보기 모달 (키보드 ESC 닫기, 접근성)
 *   5. 이메일 주소 연동 (이메일 미입력 시 비활성화 안전 처리)
 *   6. 스크롤 등장 애니메이션
 *   7. 모바일 햄버거 메뉴 열기/닫기
 * ==========================================================================
 */

"use strict";

/* ==========================================================================
   [사용자 환경설정 영역]
   공개할 준비가 완료되었을 때 아래 이메일 주소를 입력하십시오.
   비어 있을 경우(빈 문자열 "") 이메일 버튼은 비활성화 상태를 유지합니다.
   ========================================================================== */
const USER_CONFIG = {
  // 사용자의 실제 이메일 주소 (예: "younsoo.jung@example.com")
  email: "",
  
  // 학번 공개 여부 (false로 설정 시 화면에서 학번 항목이 자동으로 숨겨집니다)
  showStudentId: true
};

/* ==========================================================================
   프로젝트 상세 데이터 정의 (프로젝트 4개)
   ========================================================================== */
const PROJECTS_DATA = {
  "project-accounting": {
    category: "회계·재무 분석",
    title: "농심과 오뚜기의 재무상태 및 기업가치 비교 분석",
    summary: "두 기업의 재무 특성과 평가 방법별 결과를 비교하고 투자 판단의 차이를 검토한 분석 프로젝트",
    sections: [
      {
        title: "1. 분석 개요 및 목적",
        content: "국내 식품 산업의 대표 기업인 농심과 오뚜기를 대상으로 공시된 재무제표를 바탕으로 수익성, 안정성, 활동성 지표를 다각도로 비교 분석하였습니다. 상이한 사업 구조와 원가율이 각 기업의 재무 건전성과 수익성에 미치는 영향을 체계적으로 규명하고자 했습니다."
      },
      {
        title: "2. 주요 분석 내용 및 지표",
        content: "• 재무비율 비교: 유동비율, 부채비율(안정성), 매출액순이익률, ROE(수익성), 총자산회전율(활동성) 검토<br>• 다각적 가치평가 모델 적용: 주가수익비율(PER), 주가순자산비율(PBR) 기반의 상대가치평가와 배당할인모형(DDM), 잉여현금흐름할인법(FCF)을 통한 내재가치 산출<br>• 두 기업 간 원가 구조 및 해외 시장 비중 차이에 따른 리스크와 기회 요인 분석"
      },
      {
        title: "3. 핵심 결과 및 시사점",
        content: "동일 산업군 내에서도 제품 포트폴리오의 해외 확장력(농심)과 내수 시장 안정성 및 다각화(오뚜기)의 전략적 차이에 따라 가치평가 지표의 유의미한 격차가 발생함을 확인하였습니다. 평가 기법에 따라 도출되는 적정 가치의 스펙트럼을 비교하여 투자 판단의 한계와 유의점을 도출했습니다."
      }
    ],
    notice: {
      type: "warning",
      icon: "⚠️",
      text: "본 분석은 학업 목적으로 수행된 재무 분석 보고서이며, 특정 주식의 매수·매도 등 투자 권유가 아닙니다. 과거 기준일 시점의 재무 데이터를 바탕으로 작성되었으므로 현재 시장 정보와 차이가 있을 수 있습니다."
    },
    download: {
      available: false,
      statusText: "자료 준비 중 (공개 승인 및 저작권 검토 후 제공 예정)",
      path: ""
    }
  },

  "project-data": {
    category: "데이터 분석",
    title: "랜덤포레스트를 활용한 고성과 직원 분석",
    summary: "직원 10,000명 데이터를 분석하고 모델 성능과 현실적 적용 한계를 검토한 프로젝트",
    sections: [
      {
        title: "1. 분석 배경 및 절차",
        content: "기업 조직 내 직원 10,000명의 다차원 인사 데이터셋을 활용하여, 고성과 직원의 특성을 규명하기 위한 머신러닝 모델링을 수행했습니다. 데이터 전처리, 결측치 정제, 학습(Train) 및 시험(Test) 데이터 분리, k-fold 교차검증(Cross Validation)을 단계별로 적용했습니다."
      },
      {
        title: "2. 랜덤포레스트 모델링 및 변수 관계",
        content: "다양한 업무 환경 지표, 근속 기간, 직무 만족도, 교육 이수 시간 등의 변수와 성과 간의 상관관계를 탐색하고, 랜덤포레스트(Random Forest) 앙상블 알고리즘을 적용하여 특성 중요도(Feature Importance)를 도출했습니다."
      },
      {
        title: "3. 핵심 결과 및 성능 한계",
        content: "분석 보고서에서는 규제 적용 모델의 시험 데이터 R²가 약 0.031로 설명력이 낮게 나타났으며, 통계적 모델 결과를 개인 단위 인사 평가나 의사결정에 단독으로 사용하는 데에는 뚜렷한 한계가 있음을 솔직하게 규명하고 제시했습니다."
      }
    ],
    notice: {
      type: "warning",
      icon: "⚖️",
      text: "성별·학력·지역 등 인적 배경 변수를 이용한 차별적 의사결정으로 이어지지 않도록 분석 범위를 엄격히 통제하였으며, 본 분석 결과는 인사 판단의 절대적 기준이 아닌 탐색적 참고자료로 한정됩니다."
    },
    download: {
      available: false,
      statusText: "자료 준비 중 (데이터 보안 검토 후 요약본 제공 예정)",
      path: ""
    }
  },

  "project-semiconductor": {
    category: "산업·투자 분석",
    title: "한국 메모리 반도체 산업 투자 전망 보고서",
    summary: "국내 메모리 반도체 산업과 주요 기업을 중심으로 투자 기회와 위험 요인을 정리한 보고서",
    sections: [
      {
        title: "1. 산업 환경 및 사이클 분석",
        content: "글로벌 거시경제 지표와 AI 인프라 확장에 따른 차세대 HBM(고대역폭 메모리) 및 서버용 DRAM 수요 사이클을 조사하고, 과거 다운사이클 극복 과정과의 구조적 차이를 분석했습니다."
      },
      {
        title: "2. 기업별 경쟁력 비교 (삼성전자 vs SK하이닉스)",
        content: "• 삼성전자: 종합 반도체(IDM) 역량, 파운드리 생태계, 대규모 현금 창출력 및 공정 전환 로드맵<br>• SK하이닉스: HBM 시장 선점 경쟁력, 선단 공정 수율, 패키징 기술력 및 수익성 지표 비교"
      },
      {
        title: "3. 성장 동력 및 주요 투자 리스크",
        content: "차세대 AI 가속기 탑재 수요의 지속 가능성과 함께, 미·중 기술 경쟁 및 무역 규제, 설비투자(CAPEX) 경쟁에 따른 공급 과잉 가능성 등 복합적인 투자 위험 요인을 균형 있게 평가했습니다."
      }
    ],
    notice: {
      type: "warning",
      icon: "📊",
      text: "보고서에 수록된 수치와 전망은 과거 작성 기준일 시점의 공개 자료를 바탕으로 작성되었으며, 현재의 시장 주가나 최근 실적을 대변하지 않습니다. 본 자료는 투자 권유가 아닌 학업 연구 목적입니다."
    },
    download: {
      available: false,
      statusText: "자료 준비 중 (원문 저작권 및 재배포 조건 확인 후 제공 예정)",
      path: ""
    }
  },

  "project-marketing": {
    category: "경영·마케팅",
    title: "브랜드 포지셔닝 및 기업 사례 분석",
    summary: "마케팅 개념을 실제 브랜드 및 기업 사례에 적용해 시장 변화와 경쟁 전략을 검토한 프로젝트",
    sections: [
      {
        title: "1. 프로젝트 개요 및 분석 프레임워크",
        content: "마케팅 전략의 핵심인 시장 세분화(Segmentation), 타겟팅(Targeting), 포지셔닝(Positioning) 이론을 정립하고, 소비자의 지각도(Perceptual Map) 상에서 브랜드가 갖는 차별화된 가치 제안을 분석했습니다."
      },
      {
        title: "2. 대표 기업 사례 분석 (Kodak & Netflix)",
        content: "• 코닥(Kodak): 필름 시대의 독보적 지위에서 디지털 전환기 포지셔닝 혁신 지연으로 인한 쇠퇴 과정 분석<br>• 넷플릭스(Netflix): DVD 우편 대여에서 스트리밍 플랫폼, 오리지널 콘텐츠 제작사로의 유연한 브랜드 포지셔닝 재정의 성공 요인 분석"
      },
      {
        title: "3. 전략적 시사점",
        content: "급변하는 기술 환경과 고객 니즈 변화 속에서, 기존의 성공 공식에 안주하지 않고 브랜드의 핵심 정체성을 유지하면서도 제공 가치를 지속적으로 재정의하는 동적 포지셔닝의 중요성을 도출했습니다."
      }
    ],
    notice: {
      type: "info",
      icon: "ℹ️",
      text: "수업 교재 및 제3자 기사·이미지의 무단 배포를 엄격히 방지하기 위하여, 공개 승인된 본인 직접 작성 요약본에 한하여 검토 후 제공될 예정입니다."
    },
    download: {
      available: false,
      statusText: "자료 준비 중 (공개 승인 확인 후 제공 예정)",
      path: ""
    }
  }
};

/* ==========================================================================
   DOM 로드 완료 후 초기화
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  initEmailConfig();
  initStudentIdVisibility();
  initHeaderScroll();
  initMobileMenu();
  initSmoothScroll();
  initActiveNavOnScroll();
  initBackToTop();
  initRevealAnimation();
  initProjectModals();
});

/* --------------------------------------------------------------------------
   1. 이메일 및 학번 공개 설정 적용
   -------------------------------------------------------------------------- */
function initEmailConfig() {
  const emailBtn = document.getElementById("contactEmailBtn");
  const emailStatusText = document.getElementById("contactStatusText");

  if (!emailBtn) return;

  if (USER_CONFIG.email && USER_CONFIG.email.trim() !== "") {
    const trimmedEmail = USER_CONFIG.email.trim();
    emailBtn.removeAttribute("disabled");
    emailBtn.setAttribute("aria-disabled", "false");
    emailBtn.classList.remove("btn-disabled");
    emailBtn.classList.add("btn-primary");
    emailBtn.textContent = `이메일 문의하기 (${trimmedEmail})`;
    emailBtn.onclick = () => {
      window.location.href = `mailto:${trimmedEmail}`;
    };

    if (emailStatusText) {
      emailStatusText.textContent = `연락처: ${trimmedEmail}`;
    }
  } else {
    // 이메일 주소가 비어있는 경우 비활성화 유지
    emailBtn.setAttribute("disabled", "true");
    emailBtn.setAttribute("aria-disabled", "true");
    emailBtn.classList.add("btn-disabled");
    emailBtn.classList.remove("btn-primary");
    emailBtn.textContent = "이메일 정보 등록 예정";
    emailBtn.onclick = null;

    if (emailStatusText) {
      emailStatusText.textContent = "현재 이메일 정보 등록 준비 중입니다. 사용자가 직접 등록하면 활성화됩니다.";
    }
  }
}

function initStudentIdVisibility() {
  const studentIdItem = document.getElementById("studentIdItem");
  if (!studentIdItem) return;

  if (USER_CONFIG.showStudentId) {
    studentIdItem.style.display = "flex";
  } else {
    studentIdItem.style.display = "none";
  }
}

/* --------------------------------------------------------------------------
   2. 상단 고정 헤더 스크롤 감지
   -------------------------------------------------------------------------- */
function initHeaderScroll() {
  const header = document.getElementById("header");
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();
}

/* --------------------------------------------------------------------------
   3. 모바일 네비게이션 메뉴
   -------------------------------------------------------------------------- */
function initMobileMenu() {
  const menuBtn = document.getElementById("mobileMenuBtn");
  const navLinks = document.getElementById("primaryNav");

  if (!menuBtn || !navLinks) return;

  const toggleMenu = (open) => {
    const isExpanded = open !== undefined ? open : menuBtn.getAttribute("aria-expanded") !== "true";
    menuBtn.setAttribute("aria-expanded", String(isExpanded));
    if (isExpanded) {
      navLinks.classList.add("open");
    } else {
      navLinks.classList.remove("open");
    }
  };

  menuBtn.addEventListener("click", () => toggleMenu());

  // 링크 클릭 시 모바일 메뉴 자동 닫기
  const links = navLinks.querySelectorAll(".nav-link");
  links.forEach(link => {
    link.addEventListener("click", () => {
      toggleMenu(false);
    });
  });

  // 메뉴 밖 클릭 시 닫기
  document.addEventListener("click", (e) => {
    if (navLinks.classList.contains("open") && !navLinks.contains(e.target) && !menuBtn.contains(e.target)) {
      toggleMenu(false);
    }
  });

  // ESC 키 누르면 닫기
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && navLinks.classList.contains("open")) {
      toggleMenu(false);
      menuBtn.focus();
    }
  });
}

/* --------------------------------------------------------------------------
   4. 부드러운 스크롤 이동 (Smooth Scroll)
   -------------------------------------------------------------------------- */
function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach(link => {
    link.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (!targetId || targetId === "#") return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerHeight = document.getElementById("header")?.offsetHeight || 72;
        const targetPos = targetEl.getBoundingClientRect().top + window.pageYOffset - (headerHeight - 2);

        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        window.scrollTo({
          top: targetPos,
          behavior: prefersReducedMotion ? "auto" : "smooth"
        });

        // 포커스 이동 (접근성)
        targetEl.setAttribute("tabindex", "-1");
        targetEl.focus({ preventScroll: true });
      }
    });
  });
}

/* --------------------------------------------------------------------------
   5. 현재 스크롤 위치 기반 활성 메뉴 동기화
   -------------------------------------------------------------------------- */
function initActiveNavOnScroll() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  if (!sections.length || !navLinks.length) return;

  const updateActiveLink = () => {
    const scrollPos = window.scrollY + 120;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      const id = sec.getAttribute("id");

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          if (link.getAttribute("href") === `#${id}`) {
            link.classList.add("active");
            link.setAttribute("aria-current", "page");
          } else {
            link.classList.remove("active");
            link.removeAttribute("aria-current");
          }
        });
      }
    });
  };

  window.addEventListener("scroll", updateActiveLink, { passive: true });
  updateActiveLink();
}

/* --------------------------------------------------------------------------
   6. 맨 위로 이동 (Back-to-top) 버튼
   -------------------------------------------------------------------------- */
function initBackToTop() {
  const backToTopBtn = document.getElementById("backToTopBtn");
  if (!backToTopBtn) return;

  const toggleBackToTop = () => {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add("visible");
    } else {
      backToTopBtn.classList.remove("visible");
    }
  };

  window.addEventListener("scroll", toggleBackToTop, { passive: true });
  toggleBackToTop();

  backToTopBtn.addEventListener("click", () => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth"
    });
  });
}

/* --------------------------------------------------------------------------
   7. IntersectionObserver 기반 스크롤 등장 애니메이션
   -------------------------------------------------------------------------- */
function initRevealAnimation() {
  const revealElements = document.querySelectorAll(".reveal");
  if (!revealElements.length) return;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
    revealElements.forEach(el => el.classList.add("active"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          obs.unobserve(entry.target);
        }
      });
    },
    {
      root: null,
      threshold: 0.12,
      rootMargin: "0px 0px -40px 0px"
    }
  );

  revealElements.forEach(el => observer.observe(el));
}

/* --------------------------------------------------------------------------
   8. 프로젝트 상세 보기 모달 창 (Modal)
   -------------------------------------------------------------------------- */
function initProjectModals() {
  const modalOverlay = document.getElementById("projectModalOverlay");
  const modalCloseBtn = document.getElementById("modalCloseBtn");
  const modalCategory = document.getElementById("modalCategory");
  const modalTitle = document.getElementById("modalTitle");
  const modalSectionsContainer = document.getElementById("modalSectionsContainer");
  const modalNoticeContainer = document.getElementById("modalNoticeContainer");
  const modalDownloadContainer = document.getElementById("modalDownloadContainer");

  if (!modalOverlay || !modalCloseBtn) return;

  let lastActiveElement = null;

  const openModal = (projectId, triggerBtn) => {
    const data = PROJECTS_DATA[projectId];
    if (!data) return;

    lastActiveElement = triggerBtn;

    // 모달 데이터 채우기
    modalCategory.textContent = data.category;
    modalTitle.textContent = data.title;

    // 본문 섹션 생성
    modalSectionsContainer.innerHTML = "";
    data.sections.forEach(sec => {
      const secDiv = document.createElement("div");
      secDiv.className = "modal-section-item";

      const secTitle = document.createElement("h4");
      secTitle.className = "modal-section-title";
      secTitle.textContent = sec.title;

      const secContent = document.createElement("p");
      secContent.className = "modal-p";
      secContent.innerHTML = sec.content;

      secDiv.appendChild(secTitle);
      secDiv.appendChild(secContent);
      modalSectionsContainer.appendChild(secDiv);
    });

    // 유의사항 배너 생성
    modalNoticeContainer.innerHTML = "";
    if (data.notice) {
      const noticeDiv = document.createElement("div");
      noticeDiv.className = `notice-box notice-${data.notice.type}`;

      const iconSpan = document.createElement("span");
      iconSpan.className = "notice-icon";
      iconSpan.textContent = data.notice.icon;

      const textSpan = document.createElement("div");
      textSpan.textContent = data.notice.text;

      noticeDiv.appendChild(iconSpan);
      noticeDiv.appendChild(textSpan);
      modalNoticeContainer.appendChild(noticeDiv);
    }

    // 자료 다운로드 영역 생성 (실제 파일이 없으므로 가짜 링크 없이 비활성화 상태 표시)
    modalDownloadContainer.innerHTML = "";
    const dlSection = document.createElement("div");
    dlSection.className = "download-section";

    const dlInfo = document.createElement("div");
    dlInfo.className = "download-info";

    const dlTitle = document.createElement("span");
    dlTitle.className = "download-title";
    dlTitle.textContent = "프로젝트 보고서 및 산출물 다운로드";

    const dlStatus = document.createElement("span");
    dlStatus.className = "download-status";
    dlStatus.textContent = data.download.statusText;

    dlInfo.appendChild(dlTitle);
    dlInfo.appendChild(dlStatus);
    dlSection.appendChild(dlInfo);

    if (data.download.available && data.download.path) {
      const dlLink = document.createElement("a");
      dlLink.className = "btn btn-primary";
      dlLink.href = data.download.path;
      dlLink.download = "";
      dlLink.textContent = "다운로드 (PDF)";
      dlSection.appendChild(dlLink);
    } else {
      const dlDisabledBtn = document.createElement("button");
      dlDisabledBtn.className = "btn btn-disabled";
      dlDisabledBtn.disabled = true;
      dlDisabledBtn.setAttribute("aria-disabled", "true");
      dlDisabledBtn.textContent = "자료 준비 중";
      dlSection.appendChild(dlDisabledBtn);
    }

    modalDownloadContainer.appendChild(dlSection);

    // 모달 표시 및 스크롤 락
    modalOverlay.classList.add("active");
    modalOverlay.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    // 포커스 이동
    modalCloseBtn.focus();
  };

  const closeModal = () => {
    modalOverlay.classList.remove("active");
    modalOverlay.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";

    // 이전 활성 엘리먼트로 포커스 복구
    if (lastActiveElement && typeof lastActiveElement.focus === "function") {
      lastActiveElement.focus();
    }
  };

  // 모달 열기 버튼 이벤트 바인딩
  const modalTriggers = document.querySelectorAll("[data-modal-target]");
  modalTriggers.forEach(btn => {
    btn.addEventListener("click", function () {
      const targetId = this.getAttribute("data-modal-target");
      openModal(targetId, this);
    });
  });

  // 닫기 버튼 클릭
  modalCloseBtn.addEventListener("click", closeModal);

  // 오버레이 배경 클릭 시 닫기
  modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) {
      closeModal();
    }
  });

  // ESC 키 누르면 닫기
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalOverlay.classList.contains("active")) {
      closeModal();
    }
  });
}

