import moment from "moment";

const mapTextToHours = {
  hours: 1,
  days: 24,
  day: 24,
  months: 720,
  month: 720,
};

const calculateDateFromText = (text: string) => {
  const match = text.match(/(\d+)\s*(days|day|months|month|hours) ago/i);
  if (!match) throw new Error(`Invalid text format got ${text} `);

  const [_, number, unit] = match;
  const now = moment();

  const unitText = unit.toLowerCase();

  //@ts-ignore
  const subtractionInHours = mapTextToHours[unitText];

  if(!subtractionInHours) throw new Error(`got got an invalid unit: ${unitText}`)

  const calculatedDate = now.subtract((subtractionInHours * +number), "hours");

  return calculatedDate.valueOf();
};

export default calculateDateFromText;
