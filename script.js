const FLAGS = [
  ['AF','Afghanistan'],['AL','Albania'],['DZ','Algeria'],['AD','Andorra'],['AO','Angola'],['AG','Antigua & Barbuda'],['AR','Argentina'],['AM','Armenia'],['AU','Australia'],['AT','Austria'],['AZ','Azerbaijan'],['BS','Bahamas'],['BH','Bahrain'],['BD','Bangladesh'],['BB','Barbados'],['BY','Belarus'],['BE','Belgium'],['BZ','Belize'],['BJ','Benin'],['BT','Bhutan'],['BO','Bolivia'],['BA','Bosnia & Herzegovina'],['BW','Botswana'],['BR','Brazil'],['BN','Brunei'],['BG','Bulgaria'],['BF','Burkina Faso'],['BI','Burundi'],['CV','Cape Verde'],['KH','Cambodia'],['CM','Cameroon'],['CA','Canada'],['CF','Central African Republic'],['TD','Chad'],['CL','Chile'],['CN','China'],['CO','Colombia'],['KM','Comoros'],['CG','Congo - Brazzaville'],['CD','Congo - Kinshasa'],['CR','Costa Rica'],['CI','Côte d’Ivoire'],['HR','Croatia'],['CU','Cuba'],['CY','Cyprus'],['CZ','Czechia'],['DK','Denmark'],['DJ','Djibouti'],['DM','Dominica'],['DO','Dominican Republic'],['EC','Ecuador'],['EG','Egypt'],['SV','El Salvador'],['GQ','Equatorial Guinea'],['ER','Eritrea'],['EE','Estonia'],['SZ','Eswatini'],['ET','Ethiopia'],['FJ','Fiji'],['FI','Finland'],['FR','France'],['GA','Gabon'],['GM','Gambia'],['GE','Georgia'],['DE','Germany'],['GH','Ghana'],['GR','Greece'],['GD','Grenada'],['GT','Guatemala'],['GN','Guinea'],['GW','Guinea-Bissau'],['GY','Guyana'],['HT','Haiti'],['HN','Honduras'],['HU','Hungary'],['IS','Iceland'],['IN','India'],['ID','Indonesia'],['IR','Iran'],['IQ','Iraq'],['IE','Ireland'],['IL','Israel'],['IT','Italy'],['JM','Jamaica'],['JP','Japan'],['JO','Jordan'],['KZ','Kazakhstan'],['KE','Kenya'],['KI','Kiribati'],['KW','Kuwait'],['KG','Kyrgyzstan'],['LA','Laos'],['LV','Latvia'],['LB','Lebanon'],['LS','Lesotho'],['LR','Liberia'],['LY','Libya'],['LI','Liechtenstein'],['LT','Lithuania'],['LU','Luxembourg'],['MG','Madagascar'],['MW','Malawi'],['MY','Malaysia'],['MV','Maldives'],['ML','Mali'],['MT','Malta'],['MH','Marshall Islands'],['MR','Mauritania'],['MU','Mauritius'],['MX','Mexico'],['FM','Micronesia'],['MD','Moldova'],['MC','Monaco'],['MN','Mongolia'],['ME','Montenegro'],['MA','Morocco'],['MZ','Mozambique'],['MM','Myanmar'],['NA','Namibia'],['NR','Nauru'],['NP','Nepal'],['NL','Netherlands'],['NZ','New Zealand'],['NI','Nicaragua'],['NE','Niger'],['NG','Nigeria'],['KP','North Korea'],['MK','North Macedonia'],['NO','Norway'],['OM','Oman'],['PK','Pakistan'],['PW','Palau'],['PS','Palestinian Territories'],['PA','Panama'],['PG','Papua New Guinea'],['PY','Paraguay'],['PE','Peru'],['PH','Philippines'],['PL','Poland'],['PT','Portugal'],['QA','Qatar'],['RO','Romania'],['RU','Russia'],['RW','Rwanda'],['KN','St. Kitts & Nevis'],['LC','St. Lucia'],['VC','St. Vincent & Grenadines'],['WS','Samoa'],['SM','San Marino'],['ST','São Tomé & Príncipe'],['SA','Saudi Arabia'],['SN','Senegal'],['RS','Serbia'],['SC','Seychelles'],['SL','Sierra Leone'],['SG','Singapore'],['SK','Slovakia'],['SI','Slovenia'],['SB','Solomon Islands'],['SO','Somalia'],['ZA','South Africa'],['KR','South Korea'],['SS','South Sudan'],['ES','Spain'],['LK','Sri Lanka'],['SD','Sudan'],['SR','Suriname'],['SE','Sweden'],['CH','Switzerland'],['SY','Syria'],['TJ','Tajikistan'],['TZ','Tanzania'],['TH','Thailand'],['TL','Timor-Leste'],['TG','Togo'],['TO','Tonga'],['TT','Trinidad & Tobago'],['TN','Tunisia'],['TR','Türkiye'],['TM','Turkmenistan'],['TV','Tuvalu'],['UG','Uganda'],['UA','Ukraine'],['AE','United Arab Emirates'],['GB','United Kingdom'],['US','United States'],['UY','Uruguay'],['UZ','Uzbekistan'],['VU','Vanuatu'],['VA','Vatican City'],['VE','Venezuela'],['VN','Vietnam'],['YE','Yemen'],['ZM','Zambia'],['ZW','Zimbabwe'],['XK','Kosovo'],
  ['AX','Åland Islands'],['AS','American Samoa'],['AI','Anguilla'],['AQ','Antarctica'],['AW','Aruba'],['BM','Bermuda'],['BV','Bouvet Island'],['IO','British Indian Ocean Territory'],['VG','British Virgin Islands'],['KY','Cayman Islands'],['CX','Christmas Island'],['CC','Cocos Islands'],['CK','Cook Islands'],['CW','Curaçao'],['FK','Falkland Islands'],['FO','Faroe Islands'],['GF','French Guiana'],['PF','French Polynesia'],['TF','French Southern Territories'],['GI','Gibraltar'],['GL','Greenland'],['GP','Guadeloupe'],['GU','Guam'],['GG','Guernsey'],['HK','Hong Kong SAR China'],['IM','Isle of Man'],['JE','Jersey'],['MO','Macao SAR China'],['MQ','Martinique'],['YT','Mayotte'],['MS','Montserrat'],['NC','New Caledonia'],['NU','Niue'],['NF','Norfolk Island'],['MP','Northern Mariana Islands'],['PN','Pitcairn Islands'],['PR','Puerto Rico'],['RE','Réunion'],['BL','St. Barthélemy'],['SH','St. Helena'],['MF','St. Martin'],['PM','St. Pierre & Miquelon'],['SX','Sint Maarten'],['GS','South Georgia & South Sandwich Islands'],['SJ','Svalbard & Jan Mayen'],['TK','Tokelau'],['TC','Turks & Caicos Islands'],['UM','U.S. Outlying Islands'],['VI','U.S. Virgin Islands'],['WF','Wallis & Futuna'],['EH','Western Sahara']
].map(([code, name]) => ({ code, name, emoji: flagEmoji(code) }));

const $ = (id) => document.getElementById(id);
const setup = $('setup'), game = $('game'), results = $('results');
const input1 = $('flag1'), input2 = $('flag2');
let selected = [], currentAnswer = 0, question = 0, score = 0, startTime = 0, timerId = null, accepting = false;

function flagEmoji(code) {
  return code.toUpperCase().replace(/./g, char => String.fromCodePoint(127397 + char.charCodeAt(0)));
}

function optionText(flag) { return `${flag.emoji} ${flag.name} (${flag.code})`; }
function findFlag(value) {
  const normalized = value.trim().toLowerCase();
  return FLAGS.find(f => optionText(f).toLowerCase() === normalized)
      || FLAGS.find(f => f.code.toLowerCase() === normalized)
      || FLAGS.find(f => f.name.toLowerCase() === normalized)
      || FLAGS.find(f => normalized.startsWith(f.emoji));
}

function populateDatalist() {
  $('flags').innerHTML = FLAGS.map(f => `<option value="${optionText(f).replaceAll('"', '&quot;')}"></option>`).join('');
}

function updateChosen() {
  const f1 = findFlag(input1.value), f2 = findFlag(input2.value);
  $('chosen1').textContent = f1 ? f1.emoji : '?';
  $('chosen2').textContent = f2 ? f2.emoji : '?';
  $('chosen1').classList.toggle('muted', !f1);
  $('chosen2').classList.toggle('muted', !f2);
}

function validateSelection() {
  const f1 = findFlag(input1.value), f2 = findFlag(input2.value);
  if (!f1 || !f2) return 'Choose two flags from the autocomplete list.';
  if (f1.code === f2.code) return 'Choose two different flags.';
  selected = [f1, f2];
  return '';
}

function startGame() {
  const error = validateSelection();
  $('setupError').textContent = error;
  if (error) return;

  setup.classList.add('hidden');
  results.classList.add('hidden');
  game.classList.remove('hidden');
  question = 0;
  score = 0;
  startTime = performance.now();
  $('score').textContent = score;
  $('answer1').innerHTML = `<span class="emoji">${selected[0].emoji}</span>1 — ${selected[0].name}`;
  $('answer2').innerHTML = `<span class="emoji">${selected[1].emoji}</span>2 — ${selected[1].name}`;
  timerId = setInterval(updateTimer, 100);
  updateTimer();
  nextQuestion();
}

function updateTimer() {
  $('timer').textContent = `${((performance.now() - startTime) / 1000).toFixed(1)}s`;
}

function nextQuestion() {
  if (question >= 10) return finishGame();
  question += 1;
  currentAnswer = Math.random() < 0.5 ? 0 : 1;
  accepting = true;
  $('questionNo').textContent = question;
  $('promptFlag').textContent = selected[currentAnswer].emoji;
  $('feedback').textContent = '';
  $('feedback').className = 'feedback';
  document.querySelectorAll('.answer').forEach(btn => btn.classList.remove('correct', 'wrong'));
}

function answer(index) {
  if (!accepting) return;
  accepting = false;
  const correct = index === currentAnswer;
  if (correct) score += 1;
  $('score').textContent = score;
  $('feedback').textContent = correct ? 'Correct!' : `Nope — that was ${selected[currentAnswer].name}.`;
  $('feedback').classList.add(correct ? 'good' : 'bad');
  $('answer1').classList.toggle('correct', currentAnswer === 0);
  $('answer2').classList.toggle('correct', currentAnswer === 1);
  if (!correct) $(index === 0 ? 'answer1' : 'answer2').classList.add('wrong');
  playTone(correct);
  setTimeout(nextQuestion, correct ? 220 : 650);
}

function playTone(correct) {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return;
  const ctx = new AudioContext();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = correct ? 'sine' : 'triangle';
  osc.frequency.value = correct ? 880 : 220;
  gain.gain.setValueAtTime(0.0001, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.12, ctx.currentTime + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + (correct ? 0.10 : 0.22));
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + (correct ? 0.11 : 0.24));
}

function finishGame() {
  clearInterval(timerId);
  const elapsed = (performance.now() - startTime) / 1000;
  game.classList.add('hidden');
  results.classList.remove('hidden');
  $('percent').textContent = `${Math.round((score / 10) * 100)}%`;
  $('finalScore').textContent = `${score}/10`;
  $('finalTime').textContent = `${elapsed.toFixed(1)}s`;
}

populateDatalist();
[input1, input2].forEach(input => input.addEventListener('input', updateChosen));
$('startBtn').addEventListener('click', startGame);
$('againBtn').addEventListener('click', startGame);
$('changeBtn').addEventListener('click', () => {
  results.classList.add('hidden');
  setup.classList.remove('hidden');
});
$('answer1').addEventListener('click', () => answer(0));
$('answer2').addEventListener('click', () => answer(1));
document.addEventListener('keydown', (event) => {
  if (game.classList.contains('hidden')) return;
  if (event.key === '1') answer(0);
  if (event.key === '2') answer(1);
});
