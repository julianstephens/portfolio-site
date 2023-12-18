---
title: Lifelens Telegram Bot
published: 2023-12-18
path: /lifelens-bot
repoUrl: https://github.com/julianstephens/lifelens-bot
summary: A prompt based diary in Telegram
---

# Lifelens Telegram Bot

Lifelens is a Telegram bot that allows users to easily collect self-report health and wellness data about their life. See below for a list of available commands:

| Command         | Description                                     |
| --------------- | ----------------------------------------------- |
| Mood            | Add a mood log entry                            |
| Morning Journal | Create a new morning journal entry              |
| Evening Journal | Create a new evening journal entry              |
| Week Journal    | Create a new weekly review journal entry        |
| Weather         | View the weather forecast for the following day |

### Journals

The journal commands comprise the majority of the bot's functionality. Creating a journal entry starts a conversation between the user and Lifelens to collect data for the given journal type. Each metric utilizes a different keyboard in Telegram (i.e. text entry, number selection, radio buttons, etc.) to ensure user's are able to create entries as efficiently as possible. Once all of the data for a given entry is collected, it's stored in the associated MongoDB collection for that journal type.

### Metrics Overview

| Journal | Metrics Tracked                                                                                                                                                                                                                             |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Mood    | scale 1-5 current mood                                                                                                                                                                                                                      |
| Morning | sleep quality, bed time, wake time, sleep duration, bodyweight, body mass index (BMI)                                                                                                                                                       |
| Evening | bool(exercised), bool(meditated), bool(drank enough water), # cups of coffee, bool(ate veggies), scale 1-5 anxiety, bool(got outside), what was the main focus of the day?, scale 1-5 do you feel excited about what's ahead in the future? |
| Week    | bool(worked towards fitness goal), what's next week's fitness goal?, scale 1-5 life progress satisfaction, bool(enough family time), bool(enough friend time), bool(intellectually fulfilled), bool(went somewhere new)                     |

### Future Work

Currently, Lifelens only provides a method of data collection and leaves the task of retrieving and processing the data to the user. While it's not the intention of this project to provide data visualization tooling, a few REST API endpoints could be added to allow users to easily query their data in MongoDB.
