# Honeycomb Storage Wall Generator

[English](#english) | [Русский](#russian)

---

<a name="english"></a>
## 🇬🇧 English

### Overview

An online parametric CAD tool for generating customizable honeycomb storage wall structures. Built with [Replicad](https://replicad.xyz/) and React, this tool allows you to design and export 3D-printable honeycomb storage systems with full control over dimensions, borders, and features.

### ✨ Features

- **Flexible Grid Configuration**
  - Configure by rows/columns or width/height
  - Real-time dimension calculations
  - Automatic size optimization

- **Border Customization**
  - Flat borders (Left, Top, Right, Bottom)
  - Rounded or straight corners
  - Customizable edge styles

- **Structure Options**
  - Fill or open top/bottom faces
  - Optional base plate with adjustable thickness (0.8mm default)
  - Honeycomb wall thickness control

- **Export Options**
  - Separate STL and STEP file downloads
  - Optimized for 3D printing
  - Professional CAD compatibility

### 🚀 Live Demo

Visit the live application: [https://teslaproduuction.github.io/hsw-generator/](https://teslaproduuction.github.io/hsw-generator/)

### 📦 Installation

```bash
# Clone the repository
git clone https://github.com/teslaproduuction/hsw-generator.git
cd hsw-generator

# Install dependencies
npm install
# or
yarn install

# Start development server
npm start
# or
yarn start
```

The application will be available at `http://localhost:9999`

### 🏗️ Build

```bash
# Build for production
npm run build
# or
yarn build
```

### 🎨 Usage

1. **Configure Grid Size**
   - Choose between "Rows and Columns" or "Width and Height" mode
   - Adjust values using the input fields

2. **Customize Borders**
   - Enable/disable flat borders for each side
   - Toggle rounded corners on/off

3. **Structure Options**
   - Toggle "Fill flat faces" to create open or closed structure
   - Enable base plate and set thickness if needed

4. **Export**
   - Click "STL" to download STL file
   - Click "STEP" to download STEP file
   - Use Apply button to preview changes

### 🛠️ Technology Stack

- **Frontend**: React, styled-components
- **CAD Engine**: Replicad, OpenCascade
- **3D Rendering**: Three.js, @react-three/fiber
- **State Management**: MobX, mobx-state-tree
- **Build Tool**: Vite

### 📝 License

This project is open source and available under the MIT License.

### 🤝 Contributing

Contributions, issues, and feature requests are welcome!

### 🙏 Credits

Based on the original [replicad-hsw-generator](https://github.com/sgenoud/replicad-hsw-generator) by [sgenoud](https://github.com/sgenoud).

---

<a name="russian"></a>
## 🇷🇺 Русский

### Описание

Онлайн параметрический CAD инструмент для генерации настраиваемых сотовых систем хранения. Создан с использованием [Replicad](https://replicad.xyz/) и React, этот инструмент позволяет проектировать и экспортировать 3D-печатные сотовые системы хранения с полным контролем над размерами, границами и функциями.

### ✨ Возможности

- **Гибкая настройка сетки**
  - Настройка по рядам/колонкам или ширине/высоте
  - Расчет размеров в реальном времени
  - Автоматическая оптимизация размера

- **Настройка границ**
  - Плоские границы (Левая, Верхняя, Правая, Нижняя)
  - Закругленные или прямые углы
  - Настраиваемые стили краев

- **Опции структуры**
  - Заполненные или открытые верхняя/нижняя грани
  - Опциональная базовая подложка с регулируемой толщиной (по умолчанию 0.8мм)
  - Контроль толщины стенок сот

- **Опции экспорта**
  - Отдельная загрузка файлов STL и STEP
  - Оптимизировано для 3D-печати
  - Совместимость с профессиональными CAD системами

### 🚀 Демо

Посетите приложение: [https://teslaproduuction.github.io/hsw-generator/](https://teslaproduuction.github.io/hsw-generator/)

### 📦 Установка

```bash
# Клонировать репозиторий
git clone https://github.com/teslaproduuction/hsw-generator.git
cd hsw-generator

# Установить зависимости
npm install
# или
yarn install

# Запустить сервер разработки
npm start
# или
yarn start
```

Приложение будет доступно по адресу `http://localhost:9999`

### 🏗️ Сборка

```bash
# Сборка для продакшена
npm run build
# или
yarn build
```

### 🎨 Использование

1. **Настройка размера сетки**
   - Выберите режим "Rows and Columns" или "Width and Height"
   - Отрегулируйте значения в полях ввода

2. **Настройка границ**
   - Включите/отключите плоские границы для каждой стороны
   - Включите/отключите закругленные углы

3. **Опции структуры**
   - Переключите "Fill flat faces" для создания открытой или закрытой структуры
   - Включите базовую подложку и установите толщину при необходимости

4. **Экспорт**
   - Нажмите "STL" для загрузки STL файла
   - Нажмите "STEP" для загрузки STEP файла
   - Используйте кнопку Apply для предварительного просмотра изменений

### 🛠️ Стек технологий

- **Фронтенд**: React, styled-components
- **CAD движок**: Replicad, OpenCascade
- **3D рендеринг**: Three.js, @react-three/fiber
- **Управление состоянием**: MobX, mobx-state-tree
- **Инструмент сборки**: Vite

### 📝 Лицензия

Этот проект является открытым исходным кодом и доступен по лицензии MIT.

### 🤝 Участие в разработке

Приветствуются вклады, вопросы и запросы функций!

### 🙏 Благодарности

Основано на оригинальном [replicad-hsw-generator](https://github.com/sgenoud/replicad-hsw-generator) от [sgenoud](https://github.com/sgenoud).

---

## 📸 Screenshots / Скриншоты

![Honeycomb Storage Wall Generator](https://via.placeholder.com/800x600.png?text=Add+Screenshot+Here)

---

## 🔧 Configuration / Конфигурация

### Default Parameters / Параметры по умолчанию

- **Rows**: 8
- **Columns**: 7
- **Rounded corners**: Enabled / Включено
- **Fill flat faces**: Enabled / Включено
- **Base plate**: Disabled / Выключено
- **Base thickness**: 0.8mm

### Customization / Настройка

All parameters can be adjusted through the UI. Changes are applied in real-time with a 300ms debounce.

Все параметры можно настроить через интерфейс. Изменения применяются в реальном времени с задержкой 300мс.
