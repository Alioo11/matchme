const resumeTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ali Salehi's Resume</title>
    <style>
        *{
            font-size: 11px;
        }
        p{
            margin-top: 1px;
            margin-bottom: 1px;
        }
        .grey{
            color: grey;
        }
        strong{
            font-weight: 300;
            font-size: 12px;
        }
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            line-height: 1.4;
        }
        .container {
            width: 93%;
            margin: 0 auto;
            padding: 10px;
        }
        h1, h2 {
            color: #333;
            font-size: large;
        }
        .header, .content {
            margin-bottom: 20px;
        }

        .header h1 {
            font-size: 20px;
        }
        .header {
            border-bottom: 2px solid #333;
            padding-bottom: 10px;
            margin-bottom: 20px;
        }
        .header .contact-info {
            font-size: 0.9em;
        }
        .header .contact-info a {
            color: #0073b1;
            text-decoration: none;
            margin-right: 10px;
        }
        .header .contact-info a:hover {
            text-decoration: underline;
        }
        .section{
            color: lightslategrey;
            font-size: medium;
            font-weight: 300;

        }
        .work-experience, .skills, .education {
            margin-bottom: 20px;
        }
        .work-experience .job, .skills ul, .education p {
            margin-bottom: 10px;
        }
        .work-experience .job-title {
            font-weight: bold;
            font-size: 14px;
        }
        .skills{
            margin-left: 10px ;
            margin-right: 10px ; 
        }
        .skills ul {
            padding: 0;
            display: flex;
            flex-wrap: wrap;
        }
        .skills ul li {
            width: 50%;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Ali Salehi</h1>
            <p class="contact-info">
                Tehrān<br>
                <a href="mailto:dev.alisalehi@gmail.com">dev.alisalehi@gmail.com</a><br>
                +989912011922<br>
                <a href="https://github.com/Alioo11" target="_blank">Github</a>
                <a href="https://www.linkedin.com/in/ali-salehi-194b4b233/" target="_blank">Linkedin</a>
            </p>
        </div>
        <div class="content">
            <h2 class="section">Summary</h2>
            <p id="summary"></p>
            <h2 class="section" >Skills</h2>
            <div class="skills">
                <ul id="skill-set"></ul>
            </div>
            <h2 class="section">Work Experience</h2>
            <div class="work-experience">
                <div class="job">
                    <p class="job-title">Front End Developer</p>
                    <p class="grey"><strong>Idekavan Group - Tehrān</strong></p>
                    <p class="grey">July 2022 to February 2024</p>
                    <ul id="idekavan-mentions"></ul>
                </div>
                <div class="job">
                    <p class="job-title">Front End Developer</p>
                    <p class="grey"><strong>Nahira Tech - Tehran</strong></p>
                    <p class="grey">July 2021 to February 2022</p>
                    <ul id="nahira-mentions"></ul>
                </div>
            </div>
            <h2 class="section">Education</h2>
            <div class="education">
                <p>Bachelor's degree in Computer Engineering<br>
                <strong>Islamic Azad University</strong><br>
                January 2020 to Present</p>
            </div>
        </div>
    </div>
</body>
</html>
`;

const summaryDefaultContent = `A frontend developer with 3 years of experience, specializing in web development using modern technologies like JavaScript, TypeScript, React, and Next.js, utilized in more than 7 different projects. Thriving on the challenge of tackling complex problems and delivering high-quality code and user experiences while constantly seeking opportunities to expand skill sets and stay updated with the latest industry trends.`;
const defaultIdekavanMentions = [
  "Built scalable development pipelines and workflows, resulting in a 2x acceleration in delivery speed and a 50% reduction in bugs and have delivery and quality balanced.",
  "Refactored project codebase, eliminating deprecated logic to achieve a more scalable and predictable flow, enhancing maintainability and performance.",
  "Authored comprehensive documentation outlining merge request standards and best practices, leading to improved quality of merge requests and reduced review time by 50%.",
  "Incorporated JSdoc and other documentation tools to document project components, resulting in enhanced readability and scalability.",
];

const defaultNahiraMentions = [
  "Engaged in contributing to the development of a healthcare platform, leveraging expertise in React, TypeScript, and GraphQL to enhance user experience and functionality while maintaining transparency and building strong client relationships, resulting in an 80% client satisfaction rate.",
  "Left after completing one project due to the limited growth prospects and the desire for professional advancement, transitioned to a new role with 50% higher responsibility.",
];

export {
  resumeTemplate,
  summaryDefaultContent,
  defaultIdekavanMentions,
  defaultNahiraMentions,
};