import * as api from '../api/api'

export const fetchSchedule = async () => {
  const response = await api.fetchConferenceSchedule()
  const rowScheduleData = response.data.sections
  return rowScheduleData.map(singleSection => ({
    title: singleSection.name, days: singleSection.days.map(singleDay => ({
      date: singleDay.date,
      events: singleDay.rows.map(singleRow => ({
        startDate: singleRow.time,
        classes: singleRow.slots.map(singleSlot => ({
          label: singleSlot.kind.label,
          title: singleSlot.content ? singleSlot.content.title : singleSlot.kind.label,
          rooms: singleSlot.rooms ? singleSlot.rooms.map(singleRoom => singleRoom.name) : [],
          speakers: singleSlot.content ? [singleSlot.content.speaker.name, ...singleSlot.content.additionalSpeakers.map(singleAddSpeaker => singleAddSpeaker.name)] : [],
          description: singleSlot.content ? singleSlot.content.description : null,
          endDate: singleSlot.end
        }))
      }))
    }))
  }))
}