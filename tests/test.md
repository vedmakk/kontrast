# Markdown Formatting Test

## Table of Contents

1. [Headings](#headings)
2. [Emphasis](#emphasis)
3. [Lists](#lists)
4. [Links](#links)
5. [Images](#images)
6. [Code](#code)
7. [Blockquotes](#blockquotes)
8. [Horizontal Rule](#horizontal-rule)
9. [Tables](#tables)
10. [Task Lists](#task-lists)
11. [Inline HTML](#inline-html)

---

## Headings

# H1

## H2

### H3

#### H4

##### H5

###### H6

---

## Emphasis

**Bold text**  
_Italic text_  
**_Bold and italic_**  
~~Strikethrough~~

---

## Lists

### Unordered List

- Item A
  - Subitem A1
    - Subsubitem A1a
- Item B

### Ordered List

1. First
2. Second
   1. Second Subitem
   2. Another Subitem
3. Third

---

## Links

[Inline link](https://www.example.com)  
[Reference-style link][example]

[example]: https://www.example.com

---

## Images

Inline image:  
![Markdown Logo](https://markdown-here.com/img/icon256.png)

Reference-style image:  
![Markdown Logo][md-logo]

[md-logo]: https://markdown-here.com/img/icon256.png

---

## Code

Inline `code` example.

### Syntax Highlighting

```javascript
function greet(name) {
  console.log('Hello, ' + name + '!')
}
```

---

## Blockquotes

> This is a blockquote.
>
> > Nested blockquote.
>
> Another paragraph in the same blockquote.

---

## Horizontal Rule

---

---

## Tables

| Syntax    | Description |
| --------- | ----------- |
| Header    | Title       |
| Paragraph | Text        |

---

## Task Lists

- [x] Write the documentation
- [ ] Review the pull request
- [ ] Merge into main branch

---

## Inline HTML

<div style="color: red; font-weight: bold;">
This text is rendered using inline HTML!
</div>
