import api from '@/lib/api'

const BASE_PATH = '/api/calendar'

const buildParams = (baseParams = {}) =>
  Object.entries(baseParams).reduce((acc, [key, value]) => {
    if (value === null || value === undefined || value === '') return acc
    acc[key] = value
    return acc
  }, {})

export async function fetchCalendarRange({ memberId, startDate, endDate }) {
  if (!startDate || !endDate) {
    throw new Error('startDate와 endDate는 필수입니다.')
  }

  const params = buildParams({ memberId, startDate, endDate })
  const { data } = await api.get(BASE_PATH, { params })
  return Array.isArray(data) ? data : []
}

export async function fetchCalendarByDay({ memberId, day }) {
  if (!day) {
    throw new Error('day는 필수입니다.')
  }

  const params = buildParams({ memberId, day })
  const { data } = await api.get(`${BASE_PATH}/day`, { params })
  return data ?? null
}
