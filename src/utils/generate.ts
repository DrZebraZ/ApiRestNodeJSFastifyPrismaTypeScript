import ShortUniqueId from 'short-unique-id';


export function generateClassAreaID(): string {
  const generate = new ShortUniqueId({length: 2})
  const id = String(generate())
  return id.toUpperCase()
}

export function generateClassID(): string {
  const generate = new ShortUniqueId({length: 4})
  const id = String(generate())
  return id.toUpperCase()
}

export function generateTeacherID(): string {
  const generate = new ShortUniqueId({length: 8})
  const id = String(generate())
  return id
}

export function generateStudentID(): string {
  const generate = new ShortUniqueId({length: 12})
  const id = String(generate())
  return id
}

export function generateGuidanceID(): string{
  const generate = new ShortUniqueId({length: 14})
  const id = String(generate())
  return id.toLowerCase()
}

export function generateTccID(): string{
  const generate = new ShortUniqueId({length: 14})
  const id = String(generate())
  return id.toUpperCase()
}

export function generateMessageID(): string{
  const generate = new ShortUniqueId({length: 24})
  const id = String(generate())
  return id
}

export function generateToken(): string{
  const token = new ShortUniqueId({length: 150})
  return String(token())
}
