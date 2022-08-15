import { Ticket } from "../types/ticket";

export const JIRA_URL = "https://mendrix.atlassian.net/browse/";

export const tickets = [
  new Ticket("BLT-1817", "Rituals", "Only the stand-ups, the demo, the PoP and the end of the sprint"),
  new Ticket("BLT-1506", "Refinements", "Only the refinement sessions"),
  new Ticket("BLT-139", "Meetings", "Meetings that are not part of the Scrum/Agile rituals or preparations. I.e. the Tech meetings or calls with other people not related to specific stories or bugs"),
  new Ticket("BLT-168", "Dev-Ops", "For devops tasks, like setting the pipelines, build machine, Git"),
  new Ticket("BLT-1834", "Preparations", "Everything that includes investigations, experimentation, and studies are unrelated to a specific ticket"),
  new Ticket("BLT-1877", "Tutoring", "All of the time spent spreading the excellent way of coding"),
  new Ticket("BLT-1863", "Problem", "Something that is blocking you from working. I.e. your development environment blew up and needs to be reinstalled"),
  new Ticket("BLT-1866", "Other", "Checking the mail and planning the day "),
  new Ticket("BLT-208", "PlayHours", "Make things that you think help out MendriX but you are not sure, a few hours a week"),
  new Ticket("BLT-221", "PoP", "Working on your set goals and discussing them with your lead"),
  new Ticket("BLT-1832", "Reporting backlog", "Reporting backlog"),
  new Ticket("BLT-159", "Reports", "All communication customizations such as reports and XSLT's"),
  new Ticket("BLT-1878", "General R&D work", "Everything related to research and development (usually what the MLT does) "),
  new Ticket("BLT-843", "Project WBSO", "Story writing, hours automation, hours analysis, meetings/calls with Venderion or Robin"),
  new Ticket("BLT-842", "Stage project", "Tutoring the intern, working on intern recruitment incl. interviews and mail"),
  new Ticket("BLT-1608", "Recruitment", "Mailing with recruiters, interviews with candidates"),
  new Ticket("Lunch", "", "Hmmm lunch 😋")
];

export const notIncludedInSummary = ["Lunch"];