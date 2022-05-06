export interface MilItemProps {
  item: {
    Achieved:
      | {
          checkbox: boolean
        }
      | undefined
    'Date Achieved': {
      date:
        | {
            start: string | undefined
          }
        | undefined
    }
    Name: {
      title:
        | {
            plain_text: string | undefined
          }[]
        | undefined
    }
  }
}

const formatAchievedDate = (achievedDate: string): string =>
  new Date(achievedDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

export default function MilItem({ item }: MilItemProps) {
  const achievedDate = item['Date Achieved']?.date?.start
  const achieved = !!item.Achieved?.checkbox || !!achievedDate

  return (
    <>
      <li className="text-xl">
        <span className={`${achieved && 'line-through'}`}>{item?.Name?.title && item.Name.title[0]?.plain_text}</span>
        {achievedDate && Date.parse(achievedDate) && ` (${formatAchievedDate(achievedDate)})`}
      </li>
    </>
  )
}
