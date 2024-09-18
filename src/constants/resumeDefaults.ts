const resumeTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ali Salehi's Resume</title>
    <style>
        *{
            font-size: 12px;
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
            margin-bottom: 0px;
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
            width: 25%;
        }
        .section-subtitle {
            display:flex;
            justify-content: space-between;
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
                <a href="tel:+989912011922" target="_blank">+98 991 201 1922</a> </br>
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
                    <div class="section-subtitle">
                        <p class="grey"><strong>Idekavan Group - Tehrān</strong></p>
                        <p class="grey">July 2022 to February 2024</p>
                    </div>
                    <ul id="idekavan-mentions"></ul>
                </div>
                <div class="job">
                    <p class="job-title">Front End Developer</p>
                    <div class="section-subtitle">
                        <p class="grey"><strong>Nahira Tech - Tehran</strong></p>
                        <p class="grey">July 2021 to February 2022</p>
                    </div>
                    <ul id="nahira-mentions"></ul>
                </div>
            </div>
            <h2 class="section">Education</h2>
            <div class="education">
                <p>Bachelor's degree in Computer Engineering<br>
                <strong>Azad University</strong><br>
                January 2020 to June 2024</p>
            </div>
        </div>
    </div>
</body>
</html>
`;

const summaryDefaultContent = `A frontend developer with 3 years of experience, specializing in web development using modern technologies like JavaScript, TypeScript, React, and Next.js, utilized in more than 7 different projects. Thriving on the challenge of tackling complex problems and delivering high-quality code and user experiences while constantly seeking opportunities to expand skill sets and stay updated with the latest industry trends.`;

const defaultIdekavanMentions = [
  "Implemented a CLI tool for project refactoring, reducing project refactoring effort by 40%, which increased team productivity and streamlined development processes.",
  "Optimized Dockerfile to decrease container size by 50% and reduce build time failure rate by 30%, improving deployment efficiency and reliability.",
  "Introduced Cypress testing for a CRM application, resulting in a 10% reduction in bug reports and significantly enhancing application stability and user satisfaction.",
  "Authored comprehensive documentation outlining merge request standards and best practices, enhancing code quality and facilitating smoother team collaboration.",
  "Consistently delivered product requirements while upholding high standards for software quality, ensuring the delivery of reliable and user-centric solutions.",
  "Conducted A/B testing on the pricing page with SEO considerations, increasing user engagement by 20% and improving conversion rates.",
];

const defaultNahiraMentions = [
  "Leveraged experience with Next.js and TypeScript to optimize SEO for a healthcare platform, resulting in a 30% increase in organic traffic and improved search engine rankings.",
  "Developed and maintained a real-time multiplayer game application using React and Socket.io, significantly improving user engagement and achieving a 20% increase in active user sessions.",
  "Migrated application’s client API from REST to GraphQL, optimizing network traffic and reducing project complexity, resulting in faster data retrieval and streamlined development.",
  "Implemented a business analytics dashboard using data visualization tools, leading to enhanced data insights, informed decision-making, and a 25% increase in operational efficiency.",
  "Developed integration with third-party services, significantly expanding customer support capabilities and boosting user satisfaction by 30%.",
];

export { resumeTemplate, summaryDefaultContent, defaultIdekavanMentions, defaultNahiraMentions };
