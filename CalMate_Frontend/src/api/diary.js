import api from '@/lib/api'

const BASE_PATH = '/api/diaries'

const buildParams = (baseParams = {}) =>
  Object.entries(baseParams).reduce((acc, [key, value]) => {
    if (value === null || value === undefined || value === '') return acc
    acc[key] = value
    return acc
  }, {})

export async function fetchDiariesByDay({ memberId, day }) {
  if (!day) {
    throw new Error('day는 필수입니다.')
  }

  const params = buildParams({ memberId, day })
  const { data } = await api.get(`${BASE_PATH}/day`, { params })
  return Array.isArray(data) ? data : []
}
