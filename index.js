// Character sets for password generation
const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const numberChars = '0123456789';
const symbolChars = '~`!@#$%^&*()_-+={}[],|:;<>.?/';

// DOM elements
const generateButton = document.getElementById('generate');
const passwordElements = [document.getElementById('password1'), document.getElementById('password2')];
const passwordStrengthElement = document.getElementById('password-strength');
const copyButton = document.getElementById('copy-password');
const charLowercaseInput = document.getElementById('char-lowercase');
const charUppercaseInput = document.getElementById('char-uppercase');
const charNumbersInput = document.getElementById('char-numbers');
const charSymbolsInput = document.getElementById('char-symbols');
const passwordLengthSlider = document.getElementById('password-length');
const lengthValue = document.getElementById('length-value');

// Function to generate a random password
function generateRandomPassword() {
  const charSet = [];
  if (charLowercaseInput.checked) charSet.push(lowercaseChars);
  if (charUppercaseInput.checked) charSet.push(uppercaseChars);
  if (charNumbersInput.checked) charSet.push(numberChars);
  if (charSymbolsInput.checked) charSet.push(symbolChars);

  const charsetString = charSet.join('');
  let password = '';

  for (let i = 0; i < passwordLengthSlider.value; i++) {
    const randomIndex = Math.floor(Math.random() * charsetString.length);
    password += charsetString.charAt(randomIndex);
  }

  return password;
}

// Function to calculate password strength
function calculatePasswordStrength(password) {
  const lengthScore = Math.min(password.length / 12, 1); 
  const charTypeScore = (charLowercaseInput.checked + charUppercaseInput.checked + charNumbersInput.checked + charSymbolsInput.checked) / 4;

  return lengthScore * charTypeScore;
}

// Function to update password strength indicator
function updatePasswordStrengthIndicator(password) {
  const strength = calculatePasswordStrength(password);
  passwordStrengthElement.textContent = `Password Strength: ${Math.round(strength * 100)}%`;
}

// Function to copy password to clipboard
function copyToClipboard() {
  const password = passwordElements[0].textContent;
  const textArea = document.createElement('textarea');
  textArea.value = password;
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand('copy');
  document.body.removeChild(textArea);
  alert('Password copied to clipboard!');
}

// Event listeners
generateButton.addEventListener('click', () => {
  const password = generateRandomPassword();
  passwordElements[0].textContent = password;
  passwordElements[1].textContent = password; 
  updatePasswordStrengthIndicator(password);
});

copyButton.addEventListener('click', copyToClipboard);

charLowercaseInput.addEventListener('change', () => {
  generateButton.click(); // Regenerate password when character set changes
});
charUppercaseInput.addEventListener('change', () => {
  generateButton.click();
});
charNumbersInput.addEventListener('change', () => {
  generateButton.click();
});
charSymbolsInput.addEventListener('change', () => {
  generateButton.click();
});

passwordLengthSlider.addEventListener('input', () => {
  lengthValue.textContent = passwordLengthSlider.value;
  generateButton.click(); // Regenerate password when length changes
});

// Initial setup
lengthValue.textContent = passwordLengthSlider.value;
generateButton.click(); // Generate initial password


