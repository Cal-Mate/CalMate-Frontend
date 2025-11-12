<template>
  <div class="plan-card">
    <div class="plan-header">
      <div class="plan-info">
        <div class="plan-title-wrapper">
          <div class="plan-title">체지방 연소 플랜</div>
        </div>
        <div class="plan-details-wrapper">
          <div class="plan-detail">45분 400 kcal 소모 주 4-5회</div>
        </div>
      </div>
    </div>
    <div class="plan-content">
      <div class="plan-type-card">
        <div class="plan-type-text">복합</div>
      <div class="plan-exercise-list">
        <div class="plan-exercise-item">
          <div class="plan-exercise-text">• 러닝 25분</div>
        </div>
        <div class="plan-exercise-item">
          <div class="plan-exercise-text">• 버피 10분</div>
        </div>
        <div class="plan-exercise-item">
          <div class="plan-exercise-text">• 플랭크 5분</div>
        </div>
        <div class="plan-exercise-item">
          <div class="plan-exercise-text">• 스트레칭 5분</div>
        </div>
    </div>
      </div>
    </div>
  </div>
</template>

<script setup>

</script>

<style scoped>
/* * 💡 [2번 요청사항]
 * AiTab.vue에서 가져온 '식단 플랜' 관련 CSS입니다.
 */
.ai-diet-plan-container {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

/* 1) 컨텐츠 헤더 */
.content-header {
  display: flex;
  align-items: center;
  gap: 4px;
}
.content-title {
  color: #030213;
  font-size: 18px;
  font-weight: 600;
  line-height: 26px;
}

/* 2) 플랜 카드 */
.plan-wrapper {
  display: flex;
  flex-direction: column;
}
.plan-card {
  align-self: stretch;
  padding: 16px;
  background: #ffffff;
  border-radius: 10px;
  outline: 1px #e0e0e0 solid; /* 원본 outline 수정 */
  display: flex;
  flex-direction: column;
  gap: 12px;
}

/* 3) 플랜 상단 설명 */
.plan-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}
.plan-title-info {
  display: flex;
  flex-direction: column;
}
.plan-title {
  color: #030213;
  font-size: 18px;
  font-weight: 700;
  line-height: 26px;
}
.plan-detail {
  color: #717182;
  font-size: 16px;
  line-height: 24px;
}

.plan-type-card {
  align-self: stretch;
  padding: 12px;
  background: #f4f4f7; /* 배경색 변경 */
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.plan-type-text {
  color: #030213;
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
}


/* --- (기타 아이콘 래퍼 스타일 등) --- */
.icon-wrapper-20 { width: 20px; height: 20px; }
</style>