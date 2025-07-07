import validateForm from "../utils/validateForm.js";

describe('validateForm', () => {
  test('возвращает пустой массив при корректных данных', () => {
    const formData = new Map([
      ['firstName', 'Иван'],
      ['lastName', 'Иванов'],
      ['phone', '+7 (999) 999 99-99'],
      ['email', 'ivan@example.com'],
      ['urlCv', 'https://example.com/resume.pdf'],
    ]);

    const result = validateForm(formData);
    expect(result).toEqual([]);
  });

  test('добавляет firstName и lastName в invalidFields, если они пустые', () => {
    const formData = new Map([
      ['firstName', ''],
      ['lastName', ''],
      ['phone', '+7 (999) 999 99-99'],
      ['email', 'ivan@example.com'],
    ]);

    const result = validateForm(formData);
    expect(result).toContain('firstName');
    expect(result).toContain('lastName');
    expect(result).not.toContain('phone');
    expect(result).not.toContain('email');
  });

  test('добавляет phone в invalidFields, если телефон слишком короткий', () => {
    const formData = new Map([
      ['firstName', 'Иван'],
      ['lastName', 'Иванов'],
      ['phone', '123'],
      ['email', 'ivan@example.com'],
    ]);

    const result = validateForm(formData);
    expect(result).toContain('phone');
    expect(result).not.toContain('firstName');
    expect(result).not.toContain('lastName');
    expect(result).not.toContain('email');
  });

  test('добавляет email в invalidFields, если email пустой', () => {
    const formData = new Map([
      ['firstName', 'Иван'],
      ['lastName', 'Иванов'],
      ['phone', '+7 (999) 999 99-99'],
      ['email', ''],
    ]);

    const result = validateForm(formData);
    expect(result).toContain('email');
    expect(result).not.toContain('firstName');
    expect(result).not.toContain('lastName');
    expect(result).not.toContain('phone');
  });

  test('добавляет urlCv в invalidFields, если URL содержит пробел', () => {
    const formData = new Map([
      ['firstName', 'Иван'],
      ['lastName', 'Иванов'],
      ['phone', '+7 (999) 999 99-99'],
      ['email', 'ivan@example.com'],
      ['urlCv', 'http://example.com resume.pdf'], // пробел в строке
    ]);

    const result = validateForm(formData);
    expect(result).toContain('urlCv');
  });

  test('не добавляет urlCv в invalidFields, если URL валиден', () => {
    const formData = new Map([
      ['firstName', 'Иван'],
      ['lastName', 'Иванов'],
      ['phone', '+7 (999) 999 99-99'],
      ['email', 'ivan@example.com'],
      ['urlCv', 'http://example.com/resume.pdf'],
    ]);

    const result = validateForm(formData);
    expect(result).not.toContain('urlCv');
  });
});