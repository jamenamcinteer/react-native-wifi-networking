#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const CONFIG_FILE = path.join(__dirname, '..', 'version-configs.json');

function loadConfig() {
  try {
    return JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf8'));
  } catch (error) {
    console.error('❌ Error loading version config:', error.message);
    process.exit(1);
  }
}

function showAvailableConfigs(config) {
  console.log('\n📋 Available version configurations:');
  console.log('=====================================');

  Object.entries(config.configurations).forEach(([name, cfg]) => {
    console.log(`\n🔧 ${name}:`);
    console.log(`   ${cfg.description}`);
    console.log('   Dependencies:');
    Object.entries(cfg.dependencies).forEach(([pkg, version]) => {
      console.log(`     • ${pkg}: ${version}`);
    });
    if (cfg.devDependencies && Object.keys(cfg.devDependencies).length > 0) {
      console.log('   Dev Dependencies:');
      Object.entries(cfg.devDependencies).forEach(([pkg, version]) => {
        console.log(`     • ${pkg}: ${version}`);
      });
    }
  });

  console.log('\n📖 Usage:');
  console.log('  yarn switch-versions <config-name>');
  console.log('  yarn use:rn-0.76');
  console.log('  yarn use:latest');
  console.log('  yarn use:next');
  console.log('');
}

function switchVersions(configName, config) {
  const targetConfig = config.configurations[configName];

  if (!targetConfig) {
    console.error(`❌ Configuration "${configName}" not found`);
    showAvailableConfigs(config);
    process.exit(1);
  }

  console.log(`🚀 Switching to configuration: ${configName}`);
  console.log(`📝 ${targetConfig.description}`);

  // Remove managed packages
  if (!Array.isArray(config.managedPackages) || !config.managedPackages.every(pkg => typeof pkg === 'string' && /^[@a-zA-Z0-9/_.-]+$/.test(pkg))) {
    console.error('❌ Invalid managedPackages in version config');
    process.exit(1);
  }
  const packagesToRemove = config.managedPackages.join(' ');
  console.log(`\n🗑️  Removing managed packages: ${packagesToRemove}`);

  try {
    execSync(`yarn remove ${packagesToRemove}`, { stdio: 'inherit' });
  } catch {
    console.log('⚠️  Some packages may not have been installed, continuing...');
  }

  // Install new dependencies
  const depsToInstall = Object.entries(targetConfig.dependencies)
    .map(([pkg, version]) => `${pkg}@${version}`)
    .join(' ');

  if (depsToInstall) {
    console.log(`\n📦 Installing dependencies: ${depsToInstall}`);
    execSync(`yarn add ${depsToInstall}`, { stdio: 'inherit' });
  }

  // Install new dev dependencies
  if (targetConfig.devDependencies) {
    const devDepsToInstall = Object.entries(targetConfig.devDependencies)
      .map(([pkg, version]) => `${pkg}@${version}`)
      .join(' ');

    if (devDepsToInstall) {
      console.log(`\n🔧 Installing dev dependencies: ${devDepsToInstall}`);
      execSync(`yarn add -D ${devDepsToInstall}`, { stdio: 'inherit' });
    }
  }

  console.log(`\n✅ Successfully switched to ${configName} configuration!`);
  console.log(`\n💡 You may want to run:`);
  console.log(`   • yarn clean:ios && yarn ios`);
  console.log(`   • yarn clean:android && yarn android`);
  console.log(`   • yarn check-expo`);
}

// Main execution
const args = process.argv.slice(2);
const config = loadConfig();

if (args.length === 0) {
  showAvailableConfigs(config);
  process.exit(0);
}

const configName = args[0];
switchVersions(configName, config);
