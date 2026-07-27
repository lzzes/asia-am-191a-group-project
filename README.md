# asia-am-191a-group-project

<h1> Project Objectives </h1>
The project aims to create an archive of Students for Justice in Palestine (SJP) at UCLA’s public-facing protests and associated repression since the escalated genocide in Palestine began on October 7th, 2023. Such a resource aims to demonstrate the effect of UCLA’s continuous institutional repression of the Palestinian Liberation Movement, combat UCLA's self-described progressive image, and ensure that the collective memory of political action for Palestinian liberation endures and can be passed down to future generations of students.

<h1> Technology </h1>
<h3> What is this? </h3>
This website is formed with javascript, html, and css. We utilize the open-source MapLibreGL library to display a map with markers on the site. We additionally utilize the open-source Papa Parse library to help us process Google Form survey data and archival data documented in a Google Spreadsheet. 

<h3> How it works: </h3>
Testimonials from SJP members were collected using a Google Form and documented in a spreadsheet. This spreadsheet additionally contains an archive of all public SJP actions from Oct. 7 2023 - July 2026 (what is our present). This sheet is linked in init.js (our javascript file) where a function from the Papa Parse library reads in the spreadsheet data. We've written functions that sort the data into actions with testimonials and actions without testimonials. These functions additionally keep track of other qualities, such as dates and action types. We utilize the MapLibreGL library to visually translate these qualities onto a map, presented on the site. 

<h3> On the site: </h3>
The site first presents users with a popup, presenting a brief background on SJP and University repression and guiding users on how to use the site. Once users click out of that popup, they can scroll through both testimonies and actions, and click buttons that will zoom into action locations on the map. 

<h3> For the future: </h3>
We intend to pass off all of this code to SJP, alongside detailed in-line comments and a separate document describing site + code functionalities, and how to implement future edits. That said, the project as-is is still adaptable for future use without having to tinker with the code itself (unless desired). Should SJP wish to add more testimonials, the form still works, and the site will automatically add new testimonials. Should SJP wish to expand the archive, they need only to create more ID tags in the data spreadsheet, filling in the relevant information for the action they're adding, and change the numerical range of IDs respondents can enter into the survey. Broadly, we hope that SJP can continue expanding this archive, with more actions and/or more testimonials, to document their resilience against University repression, track how those experiences might have changed over time, and inform future members of organizational history. 