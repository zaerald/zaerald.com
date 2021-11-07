import type {NextPage} from 'next'

import Header from '@/components/Header'

const myList = [
  {
    category: 'Life Goals',
    categoryList: [
      'Read 100 Books',
      'Write and publish a book',
      'Own a house',
      'Own a car',
      'Publish 10 blogs',
      'Publish my first Youtube video',
      'Earn my first $1 from the Internet',
    ],
  },
  {
    category: 'Fitness/Health Goals',
    categoryList: [
      'Gain a Normal Weight',
      'Run a 5K',
      'Do 100 push-ups  in a single set',
    ],
  },
  {
    category: 'Skill Goals',
    categoryList: [
      'Digital Art',
      'Japanese',
      'Learn skateboarding',
      'Touch Typing 200 WPM',
      'Learn how to invest',
      'Learn to back flip',
      'English',
      'Learn to swim',
      'Staff Spinning',
    ],
  },
  {
    category: 'Events to Attend',
    categoryList: [
      'DEFCON',
      'DOTA2 The International',
    ],
  },
  {
    category: 'Travel Goals',
    categoryList: [
      'Visit Japan',
    ],
  },
  {
    category: 'Professional Goals',
    categoryList: [
      'Find one bug in Bug Bounty programs',
      'Teach in a school',
      'Perform a Tech Talk',
      '🚀 Release my first SaaS',
    ],
  },
]


const List: NextPage = () => {
  return (
    <>
      <Header/>
      <div className="w-4/5 md:w-3/4 lg:w-2/4 mx-auto mb-40 pt-36">
        <div className="text-center">
          <h1 className="inline-block mb-10 md:4 text-center text-3xl md:text-6xl lg:text-7xl border-b-8 border-accent">
            my impossible list
          </h1>
        </div>
        <div/>

        <ul>
        {myList.map(it =>
          <li key={it.category + it.categoryList.length}>
            <h2 className="inline-block ml-3 mb-4 mt-14 text-xl md:text-3xl lg:text-4xl border-b-8 border-accent lowercase">{it.category}</h2>
            <ul className="list-disc">
              {it.categoryList.map(item =>
                <li key={it.category + item + item.length} className="text-xl">{item}</li>
              )}
            </ul>
          </li>
        )}
        </ul>
      </div>

    </>
  );
}

export default List
