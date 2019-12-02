import * as React from 'react';
import Heading, { EHeadingSize } from "@edmit/component-library/src/components/atoms/typography/heading";
import AskEdmit from "@edmit/component-library/src/components/organisms/quick-faqs";
import { askEdmitCopy } from '@edmit/component-library/src/shared';

export const ValueAskEdmit: React.FC<{}> = props => {
  return (
    <span>
      <Heading size={EHeadingSize.H4} text={askEdmitCopy} className="mt3 mb3 mh2" />
      <AskEdmit loading={false} hiddenFastAnswers={[]} disabledFastAnswers={[]}
        content={
          [
            {
              answer: "Yes, a college degree is definitely worth it if you choose wisely! By investigating the career outcomes of your desired major and connecting with career planning offices, students can plan to maximize the return on investment.",
              link: "https://www.edmit.me/blog/are-college-degrees-worth-it",
              question: "Are college degrees \“worth it\”?"
            },
            {
              answer: "Students can maximize the usefulness of college career services and academic advisors services by chatting with alumni, visiting the offices beforehand, and researching job placement rates.",
              link: "https://www.edmit.me/blog/find-your-best-fit-college-evaluate-academic-advisors-and-career-services",
              question: "How can you evaluate a college's career services?"
            },
            {
              answer: "The question of whether attending a selective school is a worthy investment depends on who’s asking the question. The achievements of college graduates may have little to do with their school and more to do with the type of people they were even before they entered college.",
              link: "https://www.edmit.me/blog/will-attending-a-more-selective-school-guarantee-future-success",
              question: "Are more selective schools better?"
            },
            {
              answer: "Choosing a college major can be hard. It is recommended to take your time and consider what will be most relevant to your career and life goals.",
              link: "https://www.edmit.me/blog/when-choosing-a-major-think-long-term-relevance",
              question: "How should I choose a major?"
            }
          ]
        }
      />
    </span>
  );
};

export const AffordabilityAskEdmit: React.FC<{}> = props => {
  return (
    <span>
      <Heading size={EHeadingSize.H4} text={askEdmitCopy} className="mt3 mb3 mh2" />
      <AskEdmit loading={false} hiddenFastAnswers={[]} disabledFastAnswers={[]} content={
        [
          {
            answer: "The average student loan debt depends upon the college, the student, the type of loans taken out (student, parent, federal, or private) and the length of time that the student is in school. 62% of students graduate with less than $25,000 in total debt. Only 7% graduate with more than $50,000 in loans.",
            link: "https://www.edmit.me/blog/filtering-out-the-noise-around-student-loan-debt",
            question: "What is the average student loan debt?"
          },
          {
            answer: "College is an investment in your future. To make an informed decision, you need to understand two key areas: your expected income alongside the terms of your student loans. When you know both, you’ll be able to determine affordability.",
            link: "https://learn.edmit.me/how-much-student-loan-debt-is-too-much/",
            question: "How much student loan debt is too much?"
          },
          {
            answer: "Student loans can be issued to parents or students, by the U.S. Department of Education (called \"federal loans\") or private lenders. Federal loans can be subsidized, meaning interest does not accrue during the student's time in college.",
            link: "https://www.edmit.me/blog/what-types-of-student-loans-are-there",
            question: "What types of student loans are there?"
          },
          {
            answer: "Student loans can and should be spent on education-related expenses, which include tuition, room and board, student activity fees, books and supplies, transportation, and other related costs.",
            link: "https://www.edmit.me/blog/what-do-student-loans-cover",
            question: "What do student loans cover?"
          }
        ]
      } />
    </span>
  );
};


export const CostAskEdmit: React.FC<{}> = props => {
  return (
    <span>
      <Heading size={EHeadingSize.H4} text={askEdmitCopy} className="mt3 mb3 mh2" />
      <AskEdmit loading={false} hiddenFastAnswers={[]} disabledFastAnswers={[]}
        content={
          [
            {
              answer: "There are many variables involved in budgeting for college. Assess each item, including tuition, fees, room, and board.",
              link: "https://www.edmit.me/resources/what-does-it-really-cost-to-go-to-college",
              question: "What does it really cost to go to college?"
            },
            {
              answer: "Net price is what you will actually pay. You can take the listed price of a particular college and subtract your estimated financial aid to get your net price. Students can use tools such as net price calculators and Edmit to help.",
              link: "https://www.edmit.me/resources/how-to-calculate-college-net-price",
              question: "What is a college’s net price?"
            },
            {
              answer: "College net price calculators or averages can help provide a clearer idea of what it will cost to go to a particular college. However, they are not always able to capture everything accurately. They may not be up to date and don't often include merit aid.",
              link: "https://www.edmit.me/blog/why-college-net-price-calculators-arent-enough",
              question: "How accurate are net price calculators?"
            },
            {
              answer: "College is an increasingly expensive investment. There are many reasons why colleges continue to have rising costs including spending on college facilities and amenities and rising staff and faculty payroll costs.",
              link: "https://www.edmit.me/blog/why-does-college-cost-so-much",
              question: "Why does college cost so much?"
            }
          ]
        } />
    </span>
  );
};
