<template>
  <Teleport to="body">
    <transition name="fade">
      <div v-if="open" class="phm-overlay" @click.self="close">
        <div class="phm-modal shadow-soft" role="dialog" aria-modal="true">
          <header class="phm-header">
            <h3>포인트 내역</h3>
            <button class="phm-close" @click="close" aria-label="닫기">✕</button>
          </header>

          <!-- 요약 2칸 : '최근 20건' 기준 적립 / 사용 합계 -->
          <div class="phm-summary">
            <div class="phm-chip">
              <p class="phm-chip-label">적립</p>
              <p class="phm-chip-value">
                {{ formatNumber(earnedTotalRecent) }}<span>P</span>
              </p>
            </div>
            <div class="phm-chip">
              <p class="phm-chip-label">사용</p>
              <p class="phm-chip-value">
                {{ formatNumber(usedTotalRecent) }}<span>P</span>
              </p>
            </div>
          </div>

          <!-- 최근 20건 리스트 -->
          <div class="phm-content">
            <template v-if="recent20.length === 0">
              <div class="phm-empty">
                <div class="phm-empty-icon">🕓</div>
                <p class="phm-empty-title">아직 포인트 내역이 없습니다!</p>
                <p class="phm-empty-desc">활동을 기록하고 포인트를 획득해보세요!</p>
              </div>
            </template>

            <template v-else>
              <ul class="phm-list">
                <li v-for="(h, idx) in recent20" :key="idx" class="phm-row">
                  <div class="phm-row-left">
                    <p class="phm-row-title">{{ h.title }}</p>
                    <p class="phm-row-sub">
                      {{ h.date }} · {{ h.type === 'EARN' ? '적립' : '사용' }}
                    </p>
                  </div>
                  <div :class="['phm-row-amt', h.type === 'EARN' ? 'is-earn' : 'is-use']">
                    {{ h.type === 'EARN' ? '+' : '-' }}{{ formatNumber(h.points) }}P
                  </div>
                </li>
              </ul>
            </template>
          </div>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  open: { type: Boolean, default: false },
  /** [{ title, date:'YYYY-MM-DD HH:mm', points:number, type:'EARN'|'USE' }] */
  histories: { type: Array, default: () => [] },
});
const emit = defineEmits(['update:open', 'close']);

function close() {
  emit('update:open', false);
  emit('close');
}

const recent20 = computed(() =>
  [...(props.histories || [])]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 20)
);

// ✅ 상단 요약도 최근 20건만 합산
const earnedTotalRecent = computed(() =>
  recent20.value.reduce((sum, h) => (h.type === 'EARN' ? sum + (h.points || 0) : sum), 0)
);
const usedTotalRecent = computed(() =>
  recent20.value.reduce((sum, h) => (h.type === 'USE' ? sum + (h.points || 0) : sum), 0)
);

function formatNumber(v) {
  return Number(v || 0).toLocaleString();
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity .2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

.phm-overlay { position: fixed; inset: 0; background: rgba(15,23,42,.55); display:flex; align-items:center; justify-content:center; z-index: 60; padding: 1rem; }
.phm-modal { width: 100%; max-width: 560px; border-radius: 16px; background: #fff; border: 1px solid #e2e8f0; overflow: hidden; }
.phm-header { display:flex; align-items:center; justify-content:space-between; padding: 16px 18px; border-bottom: 1px solid #eef2f7; }
.phm-close { border: 0; background: transparent; font-size: 18px; color: #64748b; cursor: pointer; }

.phm-summary { display:grid; grid-template-columns: 1fr 1fr; gap: 12px; padding: 16px; }
.phm-chip { background:#f8fafc; border:1px solid #edf0f7; border-radius: 14px; padding: 22px 14px; text-align:center; }
.phm-chip-label { color:#64748b; font-size:1rem; font-weight: 800; letter-spacing: .02em; }
.phm-chip-value { margin-top:10px; font-weight:800; font-size:2rem; color:#0f172a; }
.phm-chip-value span { margin-left:6px; font-size:1rem; color:#94a3b8; }

.phm-content { padding: 8px 16px 16px; max-height: 56vh; overflow:auto; }

.phm-empty { display:flex; flex-direction:column; align-items:center; gap:6px; padding: 36px 0; color:#94a3b8; }
.phm-empty-icon { font-size: 40px; }
.phm-empty-title { color:#475569; font-weight:700; }
.phm-empty-desc { font-size:.9rem; }

.phm-list { display:flex; flex-direction:column; gap: 8px; }
.phm-row { display:flex; align-items:center; justify-content:space-between; padding: 12px 10px; border:1px solid #eef2f7; border-radius: 12px; background:#fff; }
.phm-row-left { display:flex; flex-direction:column; }
.phm-row-title { font-weight:600; color:#0f172a; }
.phm-row-sub { font-size:.85rem; color:#94a3b8; }
.phm-row-amt { font-weight:800; }
.phm-row-amt.is-earn { color:#10b981; }
.phm-row-amt.is-use { color:#ef4444; }

.shadow-soft { box-shadow: 0 20px 50px rgba(15,23,42,.06); }
</style>