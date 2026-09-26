import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');

function findVariableInitializer(sourceFile, variableName) {
  for (const statement of sourceFile.statements) {
    if (!ts.isVariableStatement(statement)) {
      continue;
    }

    for (const declaration of statement.declarationList.declarations) {
      if (
        ts.isIdentifier(declaration.name) &&
        declaration.name.text === variableName &&
        declaration.initializer
      ) {
        return declaration.initializer.getText(sourceFile);
      }
    }
  }

  return null;
}

async function loadTsConst(relativePath, variableName) {
  const filePath = path.join(repoRoot, relativePath);
  const source = fs.readFileSync(filePath, 'utf8');
  const sourceFile = ts.createSourceFile(filePath, source, ts.ScriptTarget.Latest, true);
  const initializer = findVariableInitializer(sourceFile, variableName);

  if (!initializer) {
    throw new Error(`Could not find "${variableName}" in ${relativePath}.`);
  }

  const transpiled = ts.transpileModule(`export default ${initializer};`, {
    compilerOptions: {
      module: ts.ModuleKind.ES2022,
      target: ts.ScriptTarget.ES2022,
    },
    fileName: filePath,
  }).outputText;

  const module = await import(`data:text/javascript;base64,${Buffer.from(transpiled).toString('base64')}`);
  return module.default;
}

function toPublicFilePath(src) {
  return path.join(repoRoot, 'public', src.replace(/^\//, '').replaceAll('/', path.sep));
}

function isRemoteUrl(src) {
  return /^https?:\/\//i.test(src);
}

const [products, categories, imageAttributions] = await Promise.all([
  loadTsConst('src/data/products.ts', 'baseProducts'),
  loadTsConst('src/data/categories.ts', 'baseCategories'),
  loadTsConst('src/data/imageAttributions.ts', 'imageAttributions'),
]);

const failures = [];
const attributionSlugs = new Set(imageAttributions.map((entry) => entry.productSlug));

for (const product of products) {
  const expectedProductPath = `/images/products/${product.slug}-01.webp`;

  if (!Array.isArray(product.images) || product.images.length === 0) {
    failures.push(`Product ${product.slug} is missing an images array entry.`);
    continue;
  }

  if (!attributionSlugs.has(product.slug)) {
    failures.push(`Product ${product.slug} is missing an attribution record.`);
  }

  for (const image of product.images) {
    if (isRemoteUrl(image.src)) {
      failures.push(`Product ${product.slug} uses a remote image URL: ${image.src}`);
      continue;
    }

    if (image.src !== expectedProductPath) {
      failures.push(`Product ${product.slug} does not use its expected image path ${expectedProductPath}. Found ${image.src}`);
    }

    const absolutePath = toPublicFilePath(image.src);
    if (!fs.existsSync(absolutePath)) {
      failures.push(`Product ${product.slug} references a missing file: ${image.src}`);
    }
  }
}

for (const category of categories) {
  const expectedHeroPath = `/images/categories/${category.slug}-hero.webp`;

  if (isRemoteUrl(category.heroImage)) {
    failures.push(`Category ${category.slug} uses a remote hero URL: ${category.heroImage}`);
    continue;
  }

  if (category.heroImage !== expectedHeroPath) {
    failures.push(`Category ${category.slug} does not use its expected hero path ${expectedHeroPath}. Found ${category.heroImage}`);
  }

  const absolutePath = toPublicFilePath(category.heroImage);
  if (!fs.existsSync(absolutePath)) {
    failures.push(`Category ${category.slug} references a missing hero file: ${category.heroImage}`);
  }
}

if (imageAttributions.length !== products.length) {
  failures.push(`Image attribution count mismatch. Expected ${products.length}, found ${imageAttributions.length}.`);
}

if (failures.length > 0) {
  console.error('Image audit failed:');
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log(`Audited ${products.length} products, ${categories.length} categories, and ${imageAttributions.length} attribution records.`);
console.log('All product images are local, all referenced files exist, and all category heroes are present.');
