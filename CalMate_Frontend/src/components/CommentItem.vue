<template>
  <div class="comment-item">
    <div class="row">
      <strong class="name">{{ comment.authorName }}</strong>
      <span class="time">{{ comment.createdAt }}</span>
    </div>

    <!-- ✅ 수정 중인지 여부 -->
    <template v-if="isEditing">
      <input v-model="editText" class="edit-input" />
      <div class="edit-actions">
        <button @click="saveEdit">저장</button>
        <button @click="cancelEdit">취소</button>
      </div>
    </template>

    <template v-else>
      <p class="body"
         :class="{ deleted: comment.content === '삭제된 댓글입니다.' }">
        {{ comment.content }}
      </p>
    </template>

    <div class="actions">

      <!-- ✅ 댓글 좋아요 버튼 -->
      <button class="like-btn" @click="toggleLike">
        <span :class="{ active: liked }">❤️</span> {{ likeCount }}
      </button>

      <!-- 대댓글 -->
      <button class="reply-btn" @click="toggleReply">
        {{ showReply ? '취소' : '답글' }}
      </button>

      <!-- 수정 / 삭제 -->
      <!-- <button class="edit-btn" @click="startEdit">수정</button>
      <button class="delete-btn" @click="removeComment">삭제</button> -->
      
      <!-- ✏️ 본인일 때만 수정/삭제 버튼 노출 -->
      <template v-if="userStore.userId === comment.memberId">
        <button class="edit-btn" @click="startEdit">수정</button>
        <button class="delete-btn" @click="removeComment">삭제</button>
      </template> 
    </div>

    <!-- ✅ 답글 입력 -->
    <div v-if="showReply" class="reply-box">
      <input
        v-model="replyText"
        placeholder="답글을 입력하세요..."
        @keyup.enter="submitReply"
      />
      <button @click="submitReply">등록</button>
    </div>

    <!-- ✅ 대댓글 목록 -->
    <div v-if="comment.replies && comment.replies.length" class="replies">
      <CommentItem
        v-for="r in comment.replies"
        :key="r.id"
        :comment="r"
        :post-id="postId"
        @submitted="$emit('submitted')"
      />
    </div>
  </div>
</template>

<script setup>
defineOptions({ name: 'CommentItem' })

import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from "@/stores/user"
import { addComment, updateComment, deleteComment, toggleCommentLike } from '@/api/post'

const userStore = useUserStore()
const router = useRouter()

const props = defineProps({
  comment: { type: Object, required: true },
  postId: { type: [String, Number], required: true }
})

const emit = defineEmits(['submitted'])

/* ✅ 좋아요 상태 */
const likeCount = ref(props.comment.likeCount ?? 0)
const liked = ref(props.comment.liked ?? false)

const toggleLike = async () => {
  if (!userStore.isLoggedIn) {
    alert("로그인이 필요합니다 😊")
    return router.push("/sign/signIn")
  }

  await toggleCommentLike(props.comment.id, userStore.userId)

  if (liked.value) {
    likeCount.value = Math.max(likeCount.value - 1, 0)
    liked.value = false
  } else {
    likeCount.value += 1
    liked.value = true
  }
}

/* ✅ 대댓글 */
const showReply = ref(false)
const replyText = ref('')
const toggleReply = () => (showReply.value = !showReply.value)

const submitReply = async () => {
  if (!userStore.isLoggedIn) {
    alert("로그인이 필요합니다 😊")
    return router.push("/sign/signIn")
  }

  if (!replyText.value.trim()) return

  await addComment(props.postId, {
    memberId: userStore.userId,
    content: replyText.value,
    parentId: props.comment.id
  })

  replyText.value = ''
  showReply.value = false
  emit('submitted')
}

/* ✅ 수정 */
const isEditing = ref(false)
const editText = ref(props.comment.content)

const startEdit = () => {
  if (!userStore.isLoggedIn) {
    alert("로그인이 필요합니다 😊")
    return router.push("/sign/signIn")
  }

  isEditing.value = true
}

const cancelEdit = () => {
  editText.value = props.comment.content
  isEditing.value = false
}

const saveEdit = async () => {
  if (!userStore.isLoggedIn) {
    alert("로그인이 필요합니다 😊")
    return router.push("/sign/signIn")
  }

  if (!editText.value.trim()) return

  await updateComment(props.postId, props.comment.id, editText.value, userStore.userId)
  isEditing.value = false
  emit('submitted')
}

/* ✅ 삭제 */
const removeComment = async () => {
  if (!userStore.isLoggedIn) {
    alert("로그인이 필요합니다 😊")
    return router.push("/sign/signIn")
  }

  if (!confirm("정말 삭제하시겠습니까?")) return
  await deleteComment(props.postId, props.comment.id, userStore.userId)
  emit('submitted')
}
</script>

<style scoped>
.comment-item { padding: 12px 0; border-bottom: 1px solid #eee; }
.row { display: flex; gap: 8px; align-items: center; }
.name { font-weight: 600; color: #111; }
.time { font-size: 12px; color: #999; }
.body { margin: 6px 0 8px; color: #333; line-height: 1.45; }

.actions { display: flex; gap: 10px; margin-top: 6px; align-items: center; }

.like-btn {
  background: none;
  border: none;
  cursor: pointer;
  color: #666;
  display: flex;
  align-items: center;
  gap: 4px;
}
.like-btn .active {
  color: #ff4d6d;
  transform: scale(1.2);
  transition: 0.2s;
}

.reply-btn, .edit-btn, .delete-btn {
  background: none; border: none; cursor: pointer; padding: 4px 0;
}
.reply-btn { color: #6c63ff; }
.edit-btn { color: #555; }
.delete-btn { color: #d9534f; }

.reply-box { display: flex; gap: 8px; margin: 8px 0; }
.reply-box input { flex: 1; padding: 8px; border: 1px solid #ddd; border-radius: 8px; }
.reply-box button { padding: 8px 12px; background: #6c63ff; color: #fff; border: none; border-radius: 6px; cursor: pointer; }

.edit-input { width: 100%; padding: 8px; border-radius: 6px; border: 1px solid #ccc; }
.edit-actions { display: flex; gap: 8px; margin: 6px 0; }

.replies { margin-left: 16px; border-left: 2px solid #f0f0f0; padding-left: 12px; }

.deleted {
  color: #9e9e9e;
  opacity: 0.7;
  font-style: italic;
  font-size: 13px;
}
</style>
