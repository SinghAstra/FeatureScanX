# FeatureScanX

A command-line tool that automatically analyzes GitHub repositories to identify implemented features, saving developers time when exploring new codebases. The tool takes a GitHub repository URL as input and provides a comprehensive analysis of features and capabilities implemented in the project.

## Features

### Core Functionality

- Automated feature detection from GitHub repositories
- Command-line interface for easy integration
- Confidence scoring for identified features
- Structured output in multiple formats (JSON, Markdown)
- Support for various project types (JavaScript, Python, Java, etc.)

### Detection Capabilities

- Documentation-based feature identification
- Code structure analysis
- Dependency analysis
- Pattern recognition in codebase
- Feature confidence scoring

## How It Works

The tool operates in multiple phases to ensure comprehensive feature detection:

### Phase 1: Documentation Analysis

- Parses README.md and documentation files
- Identifies explicit feature listings
- Extracts capability descriptions
- Analyzes project introduction sections

### Phase 2: Code Structure Analysis

- Examines directory organization
- Identifies feature-specific folders
- Maps component relationships
- Analyzes file naming patterns
- Detects architectural patterns

### Phase 3: Dependency Analysis

- Processes package management files
- Identifies framework capabilities
- Maps third-party integrations
- Recognizes common technology stacks

### Phase 4: Pattern Recognition

- Analyzes code patterns
- Identifies API endpoints
- Detects UI components
- Maps service architectures
- Recognizes testing coverage

### Phase 5: Feature Classification

Categorizes features based on:

- Core vs Supporting features
- Frontend vs Backend capabilities
- Infrastructure components
- Integration points
- Development tooling

### Phase 6: Confidence Scoring

Assigns confidence levels based on:

- Documentation presence
- Code implementation evidence
- Multiple source validation
- Pattern matching strength

## Usage

```bash
FeatureScanX <repository-url> [options]
```

### Options

- `--format`: Output format (json, markdown)
- `--depth`: Analysis depth (quick, normal, deep)
- `--confidence`: Minimum confidence level for reported features

## Output Format

The tool provides structured output including:

```json
{
  "features": {
    "core": [
      {
        "name": "User Authentication",
        "confidence": "high",
        "evidence": [
          "Found in README",
          "Detected auth middleware",
          "JWT dependencies present"
        ]
      }
    ],
    "supporting": [
      {
        "name": "Database Integration",
        "confidence": "medium",
        "evidence": [
          "ORM dependencies detected",
          "Database config files present"
        ]
      }
    ]
  }
}
```
