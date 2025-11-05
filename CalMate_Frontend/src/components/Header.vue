<template>
    <nav class="navbar">

        <div class="logo image">
            
            <!-- <RouterLink to="/"><img src="/logo.png" alt="산신령"></RouterLink> -->
        </div>

        <div class="nav container"
                @mouseover="showSubmenu = true" 
                @mouseleave="showSubmenu = false"
      >
            <ul class="menu">
                <ul>
                  <li><RouterLink to="/main/dashboard">대시보드</RouterLink></li>
                  <li><RouterLink to="#">AI추천</RouterLink></li>
                  <li><RouterLink to="#">식단 관리</RouterLink></li>
                  <li><RouterLink to="#">운동 기록</RouterLink></li>
                  <li><RouterLink to="#">일기</RouterLink></li>
                  <li><RouterLink to="#">캘린더</RouterLink></li>
                  <li><RouterLink to="/community/board">커뮤니티</RouterLink></li>
                  <li><RouterLink to="#">포인트</RouterLink></li>
                  <li><RouterLink to="#">프로필</RouterLink></li>
              </ul>
            </ul>
        </div>


    <MenuExtention :showSubmenu="showSubmenu"
                @mouseover="showSubmenu = true" 
                @mouseleave="showSubmenu = false"></MenuExtention>
    </nav>
</template>

<script setup>
    import {RouterLink } from 'vue-router';
    import {ref,watch} from 'vue';
    import { useUserStore } from '@/stores/user';
    
    const userStore = useUserStore();

    const showLoginMenu = ref(false);
    const showSubmenu = ref(false);
    const test = () => {console.log('showSubmenu:',showSubmenu.value)}
    // watch(showSubmenu, (newValue, oldValue) => {console.log(newValue)});

    const pageTitle = ['대시보드','AI추천','식단 관리','운동 기록','일기','캘린더','커뮤니티','포인트','프로필']
</script>

<style scoped>
</style>