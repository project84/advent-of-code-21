# Advent of Code

Javascript based AoC project, including puzzle solutions and:
  - Generic solution launcher
  - Result recording and verification
  - Automated initialisation of new solutions

All functionality (currently) launched via terminal (watch this space for enhancements to launcher!).

## Solution runner

Launches one or more specified puzzle solutions (if existing).

```
npm run solution -- <options>
```

### Options
Accepts all [date](#date-options) and [puzzle type](#puzzle-type-options) options. 

### Alternatives
The following alternative terminal commands are available, which additionally include [date options](#date-options) without separately specifying them:

```
npm run today
npm run all
npm run current-month
npm run current-year
```

## Answer verification
Records the verified answer for one or more puzzles.

```
npm run verify-answer -- <options>
```

### Options
Accepts all [date](#date-options) and [puzzle type](#puzzle-type-options) options. Verified answers are specified either with `part1` / `part2`, which allows the actual verified answer to be supplied via CLI, or `currentAnswer`, which marks the currently stored answer as verified. For puzzles with multiple example files, the puzzle to be verified is indicated with `index` (defaults to 1 if not specified).

For example:
```
npm run verify-answer -- --year 2021 --day 1 --example --index 2 --part1 123 --part2 321
```
Records verified answers of 123 and 321 for the 2nd example puzzle of 2021 day 1.

```
npm run verify-answer -- --all --currentAnswer
```
Marks the currently recorded answer for all puzzles as verified.

> **Note**: attempts to provide a specific verified answer for multiple dates, puzzles or puzzle types is not permitted


## Solution initialisation
Creates a blank solution file for a specified date and the folder structure for input files, if not already present. Optionally allows recording of the verified answer for the firest example.

```
npm run initialise -- <options>
```

### Options
Accepts all [date](#date-options) options, however only one date can be initialised at a time. An answer for the first example puzzle can be optionally supplied with the `answer` option.

```
npm run initialise -- --year 2021 --1 --answer 123
```

## Date options
Allows specification of the dates to be used by the launched script - date options can be used in isolation or in combination.

  - `all`
    - Includes all possible dates until the current date
  - `currentMonth` / `currentYear`
	- Includes all possible dates for the current year
  - `today`
    - Includes the current date (if it is a valid puzzle date)
  - `year`
    - Includes puzzles for the specified year - can be combined with `day` to select a single date (if valid)
  - `dates`
    - Allows selection of multiple dates using a comma separated list of dates with the format `<year>/<month>`

For example
```
npm run solution -- --all
npm run initialise -- --today
npm run verify-answer -- --year 2021 --day 1 --currentAnswer
npm run solution -- --dates 2015/1,2021/1,2021/4
```


## Puzzle type options
Specify whether to run or verify the answer for example or actual puzzles (when neither are specified, both are included):

```
npm run solution -- <date_options> --example
npm run solution -- <date_options> --actual
```