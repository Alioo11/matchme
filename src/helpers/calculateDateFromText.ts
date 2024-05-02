import moment from "moment";

const mapTextToMinutes = {
  mins:1,
  hours: 60,
  hour: 60,
  days: 1440,
  day: 1440,
  months: 43200,
  month: 43200,
};

const calculateDateFromText = (text: string) => {
  const match = text.match(/(\d+)\s*(days|day|months|month|hours|hour|mins) ago/i);
  if (!match) throw new Error(`Invalid text format got ${text} `);

  const [_, number, unit] = match;
  const now = moment();

  const unitText = unit.toLowerCase();

  //@ts-ignore
  const subtractionInHours = mapTextToMinutes[unitText];

  if(!subtractionInHours) throw new Error(`got got an invalid unit: ${unitText}`)

  const calculatedDate = now.subtract((subtractionInHours * +number), "minutes");

  return calculatedDate.valueOf();
};

export default calculateDateFromText;
