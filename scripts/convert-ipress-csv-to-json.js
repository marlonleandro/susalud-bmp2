const fs = require('fs');
const path = require('path');

// Función para limpiar caracteres especiales y corregir encoding
function cleanText(text) {
  if (!text || text === 'SN' || text === 'S/N' || text === 'NO TIENE') return '';
  
  // Reemplazar caracteres mal codificados (UTF-8 mal interpretado como ISO-8859-1)
  const replacements = {
    'Ã'': 'Ñ',
    'Ã"': 'Ó',
    'Ã': 'Í',
    'Ã': 'Á',
    'Ã‰': 'É',
    'Ãš': 'Ú',
    'Ã±': 'ñ',
    'Ã³': 'ó',
    'Ã­': 'í',
    'Ã¡': 'á',
    'Ã©': 'é',
    'Ãº': 'ú',
    'Ã¼': 'ü',
    'Ã±': 'ñ',
    'Ã': 'Ñ',
    'ï¿½': 'í',
    'Â': '',
    'JIR�N': 'JIRÓN',
    'N�': 'Nº',
    'NÃšMERO': 'NÚMERO',
    'MÃ‰DICO': 'MÉDICO',
    'CategorÃ­a': 'Categoría',
    'CIÓNCIÓNCIÓNPERU JAPONCIÓNCIÓNCIÓN': 'CLÍNICA PERÚ JAPÓN',
    'CIÓNCONSULTORIO DE ATENCIÓN INTEGRAL CIÓNCIÓNREFLEJOSCIÓNCIÓNCIÓN': 'CONSULTORIO DE ATENCIÓN INTEGRAL REFLEJOS',
    'CIÓNATENCION DOMICILIARIA': 'ATENCIÓN DOMICILIARIA',
    'ATENCION PRE HOSPITALARIACIÓN': 'ATENCIÓN PRE HOSPITALARIA',
    'MÉDico': 'MÉDICO',
    'Odontolog�a': 'Odontología',
    'CASTA�EDA': 'CASTAÑEDA',
    'CASTAÃ'EDA': 'CASTAÑEDA',
    'B�HO': 'BÚHO',
    'BÃšHO': 'BÚHO',
    'Podolog�a': 'Podología',
    'PodologÃ­a': 'Podología',
    'LUC�A': 'LUCÍA',
    'L�PEZ': 'LÓPEZ',
    'MART�N': 'MARTÍN',
    'GARC�A': 'GARCÍA',
    'RODR�GUEZ': 'RODRÍGUEZ',
    'UNI�N': 'UNIÓN',
    'AN�LISIS': 'ANÁLISIS',
    'CL�NICOS': 'CLÍNICOS',
    'AVENDA�O': 'AVENDAÑO',
    'MU�OZ': 'MUÑOZ'
  };

  let cleaned = text;
  for (const [wrong, correct] of Object.entries(replacements)) {
    cleaned = cleaned.replace(new RegExp(wrong.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), correct);
  }

  // Limpiar espacios múltiples
  cleaned = cleaned.replace(/\s+/g, ' ').trim();
  
  return cleaned;
}

// Leer el archivo CSV
const csvPath = path.join(__dirname, '..', 'docs', 'IPRESS.csv');
const csvContent = fs.readFileSync(csvPath, 'utf-8');

// Dividir en líneas
const lines = csvContent.split('\n');
const headers = lines[0].split(',');

// Procesar cada línea
const ipressList = [];
let errorsCount = 0;

for (let i = 1; i < lines.length; i++) {
  const line = lines[i].trim();
  if (!line) continue;

  try {
    // Dividir la línea por comas, pero respetando las comas dentro de comillas
    const values = [];
    let currentValue = '';
    let insideQuotes = false;

    for (let j = 0; j < line.length; j++) {
      const char = line[j];
      
      if (char === '"') {
        insideQuotes = !insideQuotes;
      } else if (char === ',' && !insideQuotes) {
        values.push(currentValue.trim());
        currentValue = '';
      } else {
        currentValue += char;
      }
    }
    values.push(currentValue.trim());

    // Validar que tengamos suficientes valores
    if (values.length < 20) {
      console.warn(`Línea ${i + 1}: Datos incompletos, saltando...`);
      errorsCount++;
      continue;
    }

    // Crear el objeto IPRESS
    const ipress = {
      institucion: cleanText(values[0]),
      codigoUnico: cleanText(values[1]),
      nombreEstablecimiento: cleanText(values[2]),
      clasificacion: cleanText(values[3]),
      tipo: cleanText(values[4]),
      departamento: cleanText(values[5]),
      provincia: cleanText(values[6]),
      distrito: cleanText(values[7]),
      ubigeo: cleanText(values[8]),
      direccion: cleanText(values[9]),
      categoria: cleanText(values[18]),
      telefono: cleanText(values[19]),
      estado: cleanText(values[25]),
      norte: cleanText(values[26]),
      este: cleanText(values[27]),
      ruc: cleanText(values[30])
    };

    // Validar que el objeto tenga datos mínimos requeridos
    if (!ipress.codigoUnico || !ipress.nombreEstablecimiento) {
      console.warn(`Línea ${i + 1}: Faltan datos críticos (código o nombre), saltando...`);
      errorsCount++;
      continue;
    }

    ipressList.push(ipress);
  } catch (error) {
    console.error(`Error procesando línea ${i + 1}:`, error.message);
    errorsCount++;
  }
}

// Guardar el archivo JSON
const jsonPath = path.join(__dirname, '..', 'docs', 'ipress.json');
fs.writeFileSync(jsonPath, JSON.stringify(ipressList, null, 2), 'utf-8');

console.log(`\n✅ Conversión completada!`);
console.log(`📊 Total de registros procesados: ${ipressList.length}`);
console.log(`⚠️  Errores encontrados: ${errorsCount}`);
console.log(`📁 Archivo generado: ${jsonPath}`);
console.log(`\nPrimeros 3 registros:`);
console.log(JSON.stringify(ipressList.slice(0, 3), null, 2));
