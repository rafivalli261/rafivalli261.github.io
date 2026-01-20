---
title: "Rust Basics: A Comprehensive Guide for Beginners"
date: 2026-01-20 14:30:00 +0700
categories:
  - programming
tags:
  - rust
  - tutorial
  - programming
toc: true
---

This guide covers the fundamental concepts of Rust programming language that every beginner needs to understand Rust code and how it works. Rust is a systems programming language that focuses on safety, speed, and concurrency.

## Table of Contents

1. [Introduction to Rust](#introduction-to-rust)
2. [Variables and Mutability](#variables-and-mutability)
3. [Data Types](#data-types)
4. [Functions](#functions)
5. [Control Flow](#control-flow)
6. [Ownership](#ownership)
7. [Borrowing and References](#borrowing-and-references)
8. [Structs](#structs)
9. [Enums](#enums)
10. [Error Handling](#error-handling)
11. [Collections](#collections)
12. [Traits](#traits)
13. [Generics](#generics)
14. [Pattern Matching](#pattern-matching)
15. [Closures and Iterators](#closures-and-iterators)

---

## Introduction to Rust

### What is Rust?

Rust is a systems programming language that runs blazingly fast, prevents segfaults, and guarantees thread safety. It was designed by Mozilla Research and is now maintained by the Rust Foundation.

### Why Learn Rust?

- **Memory Safety**: Rust guarantees memory safety without a garbage collector
- **Performance**: Rust's performance is comparable to C++
- **Concurrency**: Rust makes it easy to write concurrent programs that are data-race free
- **Modern Tooling**: Cargo provides excellent package management and build tools
- **Strong Community**: Rust has a welcoming and active community

### Setting Up Rust

```bash
# Install Rust using rustup
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# Update Rust
rustup update

# Check version
rustc --version
cargo --version

# Create a new project
cargo new hello_rust
cd hello_rust

# Run the project
cargo run
```

### Basic Hello World

```rust
fn main() {
    println!("Hello, World!");
}
```

---

## Variables and Mutability

### Declaring Variables

In Rust, variables are declared using the `let` keyword and are **immutable by default**.

```rust
fn main() {
    // Immutable variable - cannot be changed after declaration
    let x = 5;
    println!("The value of x is: {}", x);
    
    // This would cause an error because x is immutable:
    // x = 6; // Error: cannot assign twice to immutable variable
    
    // Mutable variable - can be changed with 'mut' keyword
    let mut y = 5;
    println!("The value of y is: {}", y);
    y = 6;
    println!("The value of y is now: {}", y);
}
```

### Constants

Constants are always immutable and must have their type annotated.

```rust
const MAX_POINTS: u32 = 100_000;

fn main() {
    println!("Maximum points: {}", MAX_POINTS);
}
```

**Key Differences:**
- Constants can be declared in any scope, including global
- Constants must be annotated with a type
- Constants can only be set to a constant expression, not the result of a function call

### Shadowing

You can declare a new variable with the same name as a previous variable (shadowing).

```rust
fn main() {
    let x = 5;
    let x = x + 1; // Shadowing
    let x = x * 2; // Shadowing again
    
    println!("The value of x is: {}", x);
    
    // Shadowing allows us to change types
    let spaces = "   ";
    let spaces = spaces.len();
    println!("Spaces length: {}", spaces);
}
```

---

## Data Types

### Scalar Types

#### Integers

```rust
fn main() {
    // Signed integers: i8, i16, i32, i64, i128, isize
    let small_num: i8 = -128;
    let normal_num: i32 = 100_000; // i32 is default
    
    // Unsigned integers: u8, u16, u32, u64, u128, usize
    let byte: u8 = 255;
    
    println!("Small num: {}, Normal num: {}, Byte: {}", small_num, normal_num, byte);
    
    // Integer literals
    let decimal = 98_222;      // Decimal
    let hex = 0xff;             // Hexadecimal
    let octal = 0o77;           // Octal
    let binary = 0b1111_0000;  // Binary
    let byte_literal = b'A';   // Byte (u8 only)
}
```

#### Floating-Point Numbers

```rust
fn main() {
    let x = 2.0; // f64 (default)
    let y: f32 = 3.0; // f32
    
    // Mathematical operations
    let sum = x + y;
    let difference = x - y;
    let product = x * y;
    let quotient = x / y;
    let remainder = x % y;
    
    println!("Sum: {}", sum);
}
```

#### Booleans

```rust
fn main() {
    let t = true;
    let f: bool = false; // Explicit type annotation
    
    // Boolean operations
    let and = t && f;
    let or = t || f;
    let not = !t;
    
    println!("t: {}, f: {}, and: {}, or: {}, not: {}", t, f, and, or, not);
}
```

#### Characters

```rust
fn main() {
    let c = 'z';
    let z = 'ℤ';
    let heart_eyed_cat = '😻';
    
    println!("Characters: {}, {}, {}", c, z, heart_eyed_cat);
}
```

### Compound Types

#### Tuples

```rust
fn main() {
    // Tuple with different types
    let tup: (i32, f64, u8) = (500, 6.4, 1);
    
    // Access tuple elements by index
    let five_hundred = tup.0;
    let six_point_four = tup.1;
    let one = tup.2;
    
    // Destructuring
    let (x, y, z) = tup;
    
    println!("x: {}, y: {}, z: {}", x, y, z);
    
    // Empty tuple (unit type)
    let unit = ();
}
```

#### Arrays

```rust
fn main() {
    // Array with fixed size [type; size]
    let a = [1, 2, 3, 4, 5];
    
    // Initialize array with same value
    let a = [3; 5]; // [3, 3, 3, 3, 3]
    
    // Access elements
    let first = a[0];
    let second = a[1];
    
    println!("First: {}, Second: {}", first, second);
    
    // Invalid access causes panic at runtime
    // let element = a[10]; // This would panic
}
```

### Type Inference

```rust
fn main() {
    // Rust can infer types
    let x = 5; // i32
    let y = 3.14; // f64
    
    // Sometimes we need type annotations
    let guess: u32 = "42".parse().expect("Not a number!");
    
    println!("x: {}, y: {}, guess: {}", x, y, guess);
}
```

---

## Functions

### Defining Functions

```rust
fn main() {
    println!("Hello, world!");
    
    another_function();
    function_with_parameters(5, 6);
    
    let result = add(5, 6);
    println!("The sum is: {}", result);
}

fn another_function() {
    println!("Another function!");
}

fn function_with_parameters(x: i32, y: i32) {
    println!("The value of x is: {}", x);
    println!("The value of y is: {}", y);
}

fn add(x: i32, y: i32) -> i32 {
    x + y
    // No semicolon means this is an expression and returns the value
}
```

### Statements vs Expressions

```rust
fn main() {
    // Statement: does something but doesn't return a value
    let y = 6;
    
    // Expression: evaluates to a value
    let x = {
        let y = y + 1;
        y // Expression (no semicolon)
    };
    
    println!("The value of x is: {}", x);
    
    // Expressions can be used in various places
    let number = if true { 5 } else { 6 };
    println!("Number: {}", number);
}
```

### Return Values

```rust
fn main() {
    let result1 = square(4);
    let result2 = add(5, 3);
    
    println!("Square: {}, Add: {}", result1, result2);
}

fn square(x: i32) -> i32 {
    x * x
}

// Function that returns early
fn divide(x: f64, y: f64) -> f64 {
    if y == 0.0 {
        panic!("Division by zero!");
    }
    x / y
}
```

---

## Control Flow

### If Expressions

```rust
fn main() {
    let number = 6;
    
    // Basic if
    if number < 5 {
        println!("Condition was true");
    } else {
        println!("Condition was false");
    }
    
    // else if
    if number % 4 == 0 {
        println!("number is divisible by 4");
    } else if number % 3 == 0 {
        println!("number is divisible by 3");
    } else if number % 2 == 0 {
        println!("number is divisible by 2");
    } else {
        println!("number is not divisible by 4, 3, or 2");
    }
    
    // Using if in a let statement
    let condition = true;
    let number = if condition { 5 } else { 6 };
    println!("The value of number is: {}", number);
}
```

### Loops

#### Loop

```rust
fn main() {
    let mut counter = 0;
    
    // Infinite loop
    let result = loop {
        counter += 1;
        
        if counter == 10 {
            break counter * 2; // Return value when breaking
        }
    };
    
    println!("The result is: {}", result);
}
```

#### While Loop

```rust
fn main() {
    let mut number = 3;
    
    while number != 0 {
        println!("{}!", number);
        number -= 1;
    }
    
    println!("LIFTOFF!!!");
}
```

#### For Loop

```rust
fn main() {
    let a = [10, 20, 30, 40, 50];
    
    // Iterate over elements
    for element in a.iter() {
        println!("The value is: {}", element);
    }
    
    // Range
    for number in 1..4 {
        println!("{}!", number);
    }
    
    // Reverse range
    for number in (1..4).rev() {
        println!("{}!", number);
    }
}
```

### Match Expressions

```rust
fn main() {
    let number = 13;
    
    // Match is exhaustive - must handle all possibilities
    match number {
        1 => println!("One!"),
        2 | 3 | 5 | 7 | 11 | 13 => println!("Prime!"), // Multiple patterns
        13..=19 => println!("A teen"), // Range
        _ => println!("Something else"), // Catch-all
    }
    
    // Match with bindings
    let optional_value = Some(5);
    
    match optional_value {
        Some(i) => println!("Got: {}", i),
        None => println!("Got nothing"),
    }
    
    // Match returns values
    let number = match number {
        1 => "One",
        2 => "Two",
        _ => "Other",
    };
    
    println!("Number as string: {}", number);
}
```

---

## Ownership

### The Ownership Rules

Rust's ownership system is its most unique and powerful feature. It enables memory safety without a garbage collector.

**Three Key Rules:**
1. Each value in Rust has an owner
2. There can only be one owner at a time
3. When the owner goes out of scope, the value is dropped

### Move Semantics

```rust
fn main() {
    // String (heap-allocated)
    let s1 = String::from("hello");
    let s2 = s1; // s1 is moved to s2
    
    // println!("{}", s1); // Error: s1 is no longer valid
    println!("{}", s2); // This works
    
    // Copy types (stack-allocated)
    let x = 5;
    let y = x; // x is copied to y
    
    println!("x: {}, y: {}", x, y); // Both are valid
}
```

### Stack vs Heap

```rust
fn main() {
    // Stack-allocated (fixed size, fast allocation)
    let x: i32 = 5;
    let y: bool = true;
    
    // Heap-allocated (dynamic size, slower allocation)
    let s = String::from("hello");
    let v: Vec<i32> = vec![1, 2, 3];
    
    // When s goes out of scope, the heap memory is freed
    println!("Stack: {}, Heap: {}", x, s);
}
```

### Clone

```rust
fn main() {
    let s1 = String::from("hello");
    let s2 = s1.clone(); // Deep copy
    
    println!("s1 = {}, s2 = {}", s1, s2); // Both are valid
    
    // Copy trait types
    let x = 5;
    let y = x.clone(); // Works because i32 implements Copy
}
```

### Ownership and Functions

```rust
fn main() {
    let s = String::from("hello");
    
    takes_ownership(s); // s is moved into the function
    // println!("{}", s); // Error: s is no longer valid
    
    let x = 5;
    makes_copy(x); // x is copied into the function
    println!("{}", x); // x is still valid
    
    let s = gives_ownership(); // s receives the returned value
    println!("{}", s);
    
    let s2 = String::from("hello");
    let s3 = takes_and_gives_back(s2); // s2 is moved into the function and returned
    println!("{}", s3);
}

fn takes_ownership(some_string: String) {
    println!("{}", some_string);
} // some_string goes out of scope and `drop` is called

fn makes_copy(some_integer: i32) {
    println!("{}", some_integer);
} // some_integer goes out of scope, but since it implements Copy, nothing special happens

fn gives_ownership() -> String {
    let some_string = String::from("hello");
    some_string // some_string is returned and moves out to the calling function
}

fn takes_and_gives_back(mut a_string: String) -> String {
    a_string.push_str(", world");
    a_string
}
```

---

## Borrowing and References

### References

References allow you to refer to a value without taking ownership of it.

```rust
fn main() {
    let s1 = String::from("hello");
    
    // Borrowing s1 as a reference
    let len = calculate_length(&s1);
    
    println!("The length of '{}' is {}.", s1, len);
    // s1 is still valid because we only borrowed it
}

fn calculate_length(s: &String) -> usize {
    s.len()
} // s goes out of scope, but since it doesn't have ownership, nothing happens
```

### Mutable References

```rust
fn main() {
    let mut s = String::from("hello");
    
    change(&mut s);
    
    println!("{}", s);
}

fn change(some_string: &mut String) {
    some_string.push_str(", world");
}
```

### Borrowing Rules

1. You can have either one mutable reference OR any number of immutable references
2. References must always be valid

```rust
fn main() {
    let mut s = String::from("hello");
    
    // Multiple immutable references - OK
    let r1 = &s;
    let r2 = &s;
    println!("{} and {}", r1, r2);
    
    // Mutable reference - OK (r1 and r2 are no longer used)
    let r3 = &mut s;
    println!("{}", r3);
    
    // This would be an error:
    // let r1 = &s;
    // let r2 = &s;
    // let r3 = &mut s; // Error: cannot borrow as mutable because it's already borrowed
}
```

### Dangling References

```rust
// This would cause an error:
// fn dangle() -> &String {
//     let s = String::from("hello");
//     &s // Returns a reference to s, but s goes out of scope
// } // Error: returns a reference to data owned by the current function

// Correct version:
fn no_dangle() -> String {
    let s = String::from("hello");
    s // Returns ownership
}
```

### Slices

```rust
fn main() {
    let s = String::from("hello world");
    
    // String slice
    let hello = &s[0..5];
    let world = &s[6..11];
    
    println!("{} {}", hello, world);
    
    // Full string slice
    let slice = &s[..];
    
    // Using slices in functions
    let word = first_word(&s);
    println!("First word: {}", word);
}

fn first_word(s: &String) -> &str {
    let bytes = s.as_bytes();
    
    for (i, &item) in bytes.iter().enumerate() {
        if item == b' ' {
            return &s[0..i];
        }
    }
    
    &s[..]
}
```

### String vs &str

```rust
fn main() {
    let s = String::from("hello"); // String: heap-allocated, owned
    let slice: &str = &s;          // &str: borrowed string slice
    let literal: &str = "world";   // &str: string literal
    
    println!("{} {} {}", s, slice, literal);
    
    // Function accepting both String and &str
    print_length(&s);
    print_length(literal);
}

fn print_length(s: &str) {
    println!("Length: {}", s.len());
}
```

---

## Structs

### Defining and Instantiating Structs

```rust
struct User {
    username: String,
    email: String,
    sign_in_count: u64,
    active: bool,
}

fn main() {
    // Create instance
    let user1 = User {
        email: String::from("someone@example.com"),
        username: String::from("someusername123"),
        active: true,
        sign_in_count: 1,
    };
    
    // Access fields
    println!("Email: {}", user1.email);
    
    // Mutable instance
    let mut user2 = User {
        email: String::from("another@example.com"),
        username: String::from("anotherusername567"),
        active: true,
        sign_in_count: 1,
    };
    
    user2.email = String::from("anotheremail@example.com");
}
```

### Field Shorthand

```rust
fn build_user(email: String, username: String) -> User {
    User {
        // Field init shorthand - when variable names match field names
        email,
        username,
        active: true,
        sign_in_count: 1,
    }
}
```

### Struct Update Syntax

```rust
fn main() {
    let user1 = User {
        email: String::from("someone@example.com"),
        username: String::from("someusername123"),
        active: true,
        sign_in_count: 1,
    };
    
    // Create new instance using update syntax
    let user2 = User {
        email: String::from("another@example.com"),
        ..user1 // Rest of fields from user1
    };
    
    // Note: user1 is partially moved (String fields are moved)
}
```

### Tuple Structs

```rust
struct Color(i32, i32, i32);
struct Point(i32, i32, i32);

fn main() {
    let black = Color(0, 0, 0);
    let origin = Point(0, 0, 0);
    
    let Color(r, g, b) = black;
    println!("RGB: {}, {}, {}", r, g, b);
}
```

### Unit-Like Structs

```rust
struct AlwaysEqual;

fn main() {
    let subject = AlwaysEqual;
    // Used when you need a type but don't care about data
}
```

### Methods

```rust
struct Rectangle {
    width: u32,
    height: u32,
}

impl Rectangle {
    // Method with &self (borrowing)
    fn area(&self) -> u32 {
        self.width * self.height
    }
    
    // Method taking ownership
    fn destroy(self) {
        println!("Destroying rectangle");
    }
    
    // Associated function (like static method)
    fn square(size: u32) -> Rectangle {
        Rectangle {
            width: size,
            height: size,
        }
    }
}

fn main() {
    let rect = Rectangle {
        width: 30,
        height: 50,
    };
    
    println!("Area: {}", rect.area());
    
    let square = Rectangle::square(25);
    println!("Square area: {}", square.area());
}
```

### Multiple impl Blocks

```rust
impl Rectangle {
    fn width(&self) -> bool {
        self.width > 0
    }
}

impl Rectangle {
    fn can_hold(&self, other: &Rectangle) -> bool {
        self.width > other.width && self.height > other.height
    }
}
```

---

## Enums

### Defining Enums

```rust
enum IpAddr {
    V4(u8, u8, u8, u8),
    V6(String),
}

fn main() {
    let home = IpAddr::V4(127, 0, 0, 1);
    let loopback = IpAddr::V6(String::from("::1"));
}
```

### Enum with Data

```rust
enum Message {
    Quit,
    Move { x: i32, y: i32 },
    Write(String),
    ChangeColor(i32, i32, i32),
}

impl Message {
    fn call(&self) {
        match self {
            Message::Quit => println!("Quit"),
            Message::Move { x, y } => println!("Move to {}, {}", x, y),
            Message::Write(msg) => println!("Write: {}", msg),
            Message::ChangeColor(r, g, b) => println!("Change color: {}, {}, {}", r, g, b),
        }
    }
}

fn main() {
    let m = Message::Write(String::from("Hello"));
    m.call();
}
```

### Option Enum

Rust doesn't have `null` - it uses `Option` to represent the absence of a value.

```rust
// Option is defined as:
// enum Option<T> {
//     Some(T),
//     None,
// }

fn main() {
    let some_number = Some(5);
    let some_string = Some("a string");
    let absent_number: Option<i32> = None;
    
    // You must handle Option before using the value
    if let Some(x) = some_number {
        println!("Number: {}", x);
    }
    
    // This is necessary:
    let x: i8 = 5;
    let y: Option<i8> = Some(5);
    
    // let sum = x + y; // Error: can't add i8 and Option<i8>
    let sum = x + y.unwrap_or(0); // Safe way to handle Option
    println!("Sum: {}", sum);
}
```

---

## Error Handling

### Result Enum

```rust
// Result is defined as:
// enum Result<T, E> {
//     Ok(T),
//     Err(E),
// }

use std::fs::File;
use std::io::ErrorKind;

fn main() {
    let f = File::open("hello.txt");
    
    match f {
        Ok(file) => println!("File opened: {:?}", file),
        Err(error) => match error.kind() {
            ErrorKind::NotFound => match File::create("hello.txt") {
                Ok(fc) => println!("Created file: {:?}", fc),
                Err(e) => panic!("Failed to create file: {:?}", e),
            },
            other_error => panic!("Failed to open file: {:?}", other_error),
        },
    }
}
```

### Unwrap and Expect

```rust
use std::fs::File;

fn main() {
    // unwrap: returns value or panics with default message
    let f = File::open("hello.txt").unwrap();
    
    // expect: returns value or panics with custom message
    let f = File::open("hello.txt").expect("Failed to open hello.txt");
}
```

### Propagating Errors

```rust
use std::fs::File;
use std::io::{self, Read};

fn read_username_from_file() -> Result<String, io::Error> {
    let mut file = File::open("hello.txt")?;
    
    let mut username = String::new();
    file.read_to_string(&mut username)?;
    
    Ok(username)
}

// Shortcut using ?
fn read_username_from_file_short() -> Result<String, io::Error> {
    let mut username = String::new();
    File::open("hello.txt")?.read_to_string(&mut username)?;
    Ok(username)
}
```

### Custom Error Types

```rust
#[derive(Debug)]
enum AppError {
    InvalidInput(String),
    NetworkError,
}

fn validate_input(input: &str) -> Result<(), AppError> {
    if input.is_empty() {
        Err(AppError::InvalidInput("Input cannot be empty".to_string()))
    } else {
        Ok(())
    }
}

fn main() {
    match validate_input("") {
        Ok(_) => println!("Valid input"),
        Err(e) => println!("Error: {:?}", e),
    }
}
```

---

## Collections

### Vectors

```rust
fn main() {
    // Creating a new vector
    let v: Vec<i32> = Vec::new();
    
    // Using macro (preferred when type is known)
    let v = vec![1, 2, 3];
    
    // Adding elements
    let mut v = Vec::new();
    v.push(5);
    v.push(6);
    v.push(7);
    
    // Reading elements
    let third: &i32 = &v[2];
    println!("The third element is {}", third);
    
    match v.get(2) {
        Some(third) => println!("The third element is {}", third),
        None => println!("There is no third element"),
    }
    
    // Iterating
    for i in &v {
        println!("{}", i);
    }
    
    // Modifying elements
    for i in &mut v {
        *i *= 2;
    }
    
    // Using enum to store different types
    enum SpreadsheetCell {
        Int(i32),
        Float(f64),
        Text(String),
    }
    
    let row = vec![
        SpreadsheetCell::Int(3),
        SpreadsheetCell::Text(String::from("blue")),
        SpreadsheetCell::Float(10.12),
    ];
}
```

### Strings

```rust
fn main() {
    // Creating String
    let mut s = String::new();
    let s = String::from("initial contents");
    let s = "initial contents".to_string();
    
    // Updating a String
    let mut s = String::from("foo");
    s.push_str("bar");
    s.push('!');
    
    // Concatenation
    let s1 = String::from("Hello, ");
    let s2 = String::from("world!");
    let s3 = s1 + &s2; // s1 is moved, s2 is borrowed
    
    // Format macro
    let s1 = String::from("tic");
    let s2 = String::from("tac");
    let s3 = String::from("toe");
    let s = format!("{}-{}-{}", s1, s2, s3);
    
    // Slicing strings (be careful with UTF-8)
    let hello = "Здравствуйте";
    let s = &hello[0..4]; // First 4 bytes, not necessarily 4 characters
    
    // Iterating
    for c in "नमस्ते".chars() {
        println!("{}", c);
    }
    
    for b in "नमस्ते".bytes() {
        println!("{}", b);
    }
}
```

### HashMap

```rust
use std::collections::HashMap;

fn main() {
    // Creating HashMap
    let mut scores = HashMap::new();
    
    scores.insert(String::from("Blue"), 10);
    scores.insert(String::from("Yellow"), 50);
    
    // Accessing values
    let team_name = String::from("Blue");
    let score = scores.get(&team_name);
    
    // Iterating
    for (key, value) in &scores {
        println!("{}: {}", key, value);
    }
    
    // Overwriting a value
    scores.insert(String::from("Blue"), 25);
    
    // Only inserting if key has no value
    scores.entry(String::from("Yellow")).or_insert(50);
    
    // Updating based on old value
    let text = "hello world wonderful world";
    let mut map = HashMap::new();
    
    for word in text.split_whitespace() {
        let count = map.entry(word).or_insert(0);
        *count += 1;
    }
    
    println!("{:?}", map);
}
```

---

## Traits

### Defining Traits

```rust
trait Summary {
    fn summarize(&self) -> String;
}

struct NewsArticle {
    headline: String,
    location: String,
    author: String,
    content: String,
}

impl Summary for NewsArticle {
    fn summarize(&self) -> String {
        format!("{}, by {} ({})", self.headline, self.author, self.location)
    }
}

struct Tweet {
    username: String,
    content: String,
    reply: bool,
    retweet: bool,
}

impl Summary for Tweet {
    fn summarize(&self) -> String {
        format!("{}: {}", self.username, self.content)
    }
}

fn main() {
    let tweet = Tweet {
        username: String::from("horse_ebooks"),
        content: String::from("of course, as you probably already know, people"),
        reply: false,
        retweet: false,
    };
    
    println!("1 new tweet: {}", tweet.summarize());
}
```

### Default Implementations

```rust
trait Summary {
    fn summarize(&self) -> String {
        String::from("(Read more...)")
    }
    
    fn summarize_verbose(&self) -> String {
        format!("{} (Read more...)", self.summarize())
    }
}
```

### Traits as Parameters

```rust
pub fn notify(item: &impl Summary) {
    println!("Breaking news! {}", item.summarize());
}

// Trait bound syntax (equivalent to above)
pub fn notify_bound<T: Summary>(item: &T) {
    println!("Breaking news! {}", item.summarize());
}

// Multiple trait bounds
pub fn notify_multiple(item: &(impl Summary + Display)) {
    println!("Breaking news! {}", item.summarize());
}

// Using where clause for clearer syntax
fn some_function<T, U>(t: &T, u: &U) -> i32
where
    T: Display + Clone,
    U: Clone + Debug,
{
    // function body
    0
}
```

### Return Types

```rust
fn returns_summarizable() -> impl Summary {
    Tweet {
        username: String::from("horse_ebooks"),
        content: String::from("of course, as you probably already know, people"),
        reply: false,
        retweet: false,
    }
}
```

### Conditionally Implementing Methods

```rust
use std::fmt::Display;

struct Pair<T> {
    x: T,
    y: T,
}

impl<T> Pair<T> {
    fn new(x: T, y: T) -> Self {
        Self { x, y }
    }
}

impl<T: Display + PartialOrd> Pair<T> {
    fn cmp_display(&self) {
        if self.x >= self.y {
            println!("The largest member is x = {}", self.x);
        } else {
            println!("The largest member is y = {}", self.y);
        }
    }
}
```

---

## Generics

### Generic Functions

```rust
fn largest<T: PartialOrd>(list: &[T]) -> &T {
    let mut largest = &list[0];
    
    for item in list {
        if item > largest {
            largest = item;
        }
    }
    
    largest
}

fn main() {
    let number_list = vec![34, 50, 25, 100, 65];
    let result = largest(&number_list);
    println!("The largest number is {}", result);
    
    let char_list = vec!['y', 'm', 'a', 'q'];
    let result = largest(&char_list);
    println!("The largest char is {}", result);
}
```

### Generic Structs

```rust
struct Point<T> {
    x: T,
    y: T,
}

fn main() {
    let integer = Point { x: 5, y: 10 };
    let float = Point { x: 1.0, y: 4.0 };
}
```

### Multiple Type Parameters

```rust
struct Point<T, U> {
    x: T,
    y: U,
}

fn main() {
    let both_integer = Point { x: 5, y: 10 };
    let both_float = Point { x: 1.0, y: 4.0 };
    let integer_and_float = Point { x: 5, y: 4.0 };
}
```

### Generic Enums

```rust
enum Option<T> {
    Some(T),
    None,
}

enum Result<T, E> {
    Ok(T),
    Err(E),
}
```

### Lifetime Parameters

```rust
// Lifetime annotation ensures references are valid
fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {
    if x.len() > y.len() {
        x
    } else {
        y
    }
}

fn main() {
    let string1 = String::from("long string is long");
    let result;
    {
        let string2 = String::from("xyz");
        result = longest(string1.as_str(), string2.as_str());
    }
    println!("The longest string is {}", result);
}
```

### Struct Lifetimes

```rust
struct ImportantExcerpt<'a> {
    part: &'a str,
}

fn main() {
    let novel = String::from("Call me Ishmael. Some years ago...");
    let first_sentence = novel.split('.').next().unwrap();
    let i = ImportantExcerpt {
        part: first_sentence,
    };
}
```

### Lifetime Elision

```rust
// These are equivalent:
fn first_word(s: &str) -> &str {
    let bytes = s.as_bytes();
    for (i, &item) in bytes.iter().enumerate() {
        if item == b' ' {
            return &s[0..i];
        }
    }
    &s[..]
}

// With explicit lifetimes:
fn first_word<'a>(s: &'a str) -> &'a str {
    let bytes = s.as_bytes();
    for (i, &item) in bytes.iter().enumerate() {
        if item == b' ' {
            return &s[0..i];
        }
    }
    &s[..]
}
```

---

## Pattern Matching

### Match Patterns

```rust
fn main() {
    let x = 1;
    
    match x {
        1 => println!("one"),
        2 => println!("two"),
        3 => println!("three"),
        _ => println!("anything"),
    }
}
```

### Matching with Variables

```rust
fn main() {
    let x = Some(5);
    let y = 10;
    
    match x {
        Some(50) => println!("Got 50"),
        Some(y) => println!("Matched, y = {:?}", y),
        _ => println!("Default case, x = {:?}", x),
    }
    
    println!("at the end: x = {:?}, y = {:?}", x, y);
}
```

### Multiple Patterns

```rust
fn main() {
    let x = 1;
    
    match x {
        1 | 2 => println!("one or two"),
        3 => println!("three"),
        _ => println!("anything"),
    }
}
```

### Matching Ranges

```rust
fn main() {
    let x = 5;
    
    match x {
        1..=5 => println!("one through five"),
        _ => println!("something else"),
    }
}

fn main() {
    let x = 'c';
    
    match x {
        'a'..='j' => println!("early ASCII letter"),
        'k'..='z' => println!("late ASCII letter"),
        _ => println!("something else"),
    }
}
```

### Destructuring Structs

```rust
struct Point {
    x: i32,
    y: i32,
}

fn main() {
    let p = Point { x: 0, y: 7 };
    
    let Point { x: a, y: b } = p;
    println!("a: {}, b: {}", a, b);
    
    // Shorthand
    let Point { x, y } = p;
    println!("x: {}, y: {}", x, y);
    
    // Partial matching
    match p {
        Point { x: 0, y } => println!("On the y axis at {}", y),
        Point { x, y: 0 } => println!("On the x axis at {}", x),
        Point { x, y } => println!("On neither axis: ({}, {})", x, y),
    }
}
```

### Destructuring Enums

```rust
enum Message {
    Quit,
    Move { x: i32, y: i32 },
    Write(String),
    ChangeColor(i32, i32, i32),
}

fn main() {
    let msg = Message::ChangeColor(0, 160, 255);
    
    match msg {
        Message::Quit => println!("The Quit variant has no data"),
        Message::Move { x, y } => println!("Move to ({}, {})", x, y),
        Message::Write(text) => println!("Text message: {}", text),
        Message::ChangeColor(r, g, b) => println!("Change color to RGB({}, {}, {})", r, g, b),
    }
}
```

### Ignoring Values

```rust
fn main() {
    let mut setting_value = Some(5);
    let new_setting_value = Some(10);
    
    match (setting_value, new_setting_value) {
        (Some(_), Some(_)) => println!("Can't overwrite an existing customized value"),
        _ => setting_value = new_setting_value,
    }
    
    println!("setting is {:?}", setting_value);
    
    // Ignoring multiple fields
    let numbers = (2, 4, 8, 16, 32);
    
    match numbers {
        (first, _, third, _, fifth) => println!("Some numbers: {}, {}, {}", first, third, fifth),
    }
}
```

### `if let` and `while let`

```rust
fn main() {
    let some_option = Some(5);
    
    // if let - cleaner than match for one pattern
    if let Some(x) = some_option {
        println!("Matched: {}", x);
    }
    
    // while let
    let mut optional = Some(0);
    
    while let Some(i) = optional {
        if i > 5 {
            println!("Greater than 5, quit!");
            optional = None;
        } else {
            println!("i is {:?}. Try again.", i);
            optional = Some(i + 1);
        }
    }
}
```

---

## Closures and Iterators

### Closures

Closures are anonymous functions that can capture their environment.

```rust
fn main() {
    let expensive_closure = |num| {
        println!("calculating slowly...");
        std::thread::sleep(std::time::Duration::from_secs(2));
        num * 2
    };
    
    let result = expensive_closure(5);
    println!("Result: {}", result);
}
```

### Closure Type Inference

```rust
fn main() {
    let add_one = |x: i32| -> i32 { x + 1 };
    let add_two = |x| x + 2;
    let add_three = |x| {
        let y = x + 3;
        y
    };
    
    println!("{}", add_one(1));
    println!("{}", add_two(1));
    println!("{}", add_three(1));
}
```

### Capturing Environment

```rust
fn main() {
    let x = 4;
    
    // Borrows immutably
    let equal_to_x = |z| z == x;
    
    let y = 4;
    assert!(equal_to_x(y));
    
    // Borrows mutably
    let mut list = vec
![1, 2, 3];
    println!("Before: {:?}", list);
    
    let mut borrows_mutably = || list.push(7);
    
    borrows_mutably();
    println!("After: {:?}", list);
    
    // Takes ownership
    let list = vec
![1, 2, 3];
    println!("Before defining closure: {:?}", list);
    
    thread::spawn(move || {
        println!("From thread: {:?}", list);
    })
    .join()
    .unwrap();
}
```

### Iterator Basics

```rust
fn main() {
    let v = vec
![1, 2, 3];
    
    // Creating an iterator
    let iter = v.iter()
;
    
    // Using for loop
    for val in v.iter()
 {
        println!("Got: {}", val);
    }
    
    // Consuming iterator
    let total: i32 = v.iter()
.sum();
    println!("Total: {}", total);
}
```

### Iterator Methods

```rust
fn main() {
    let v = vec
![1, 2, 3, 4, 5];
    
    // map
    let v2: Vec<i32> = v.iter()
.map(|x| x * 2).collect();
    println!("Doubled: {:?}", v2);
    
    // filter
    let v3: Vec<&i32> = v.iter()
.filter(|&x| x > 2).collect();
    println!("Greater than 2: {:?}", v3);
    
    // Chaining
    let result: Vec<i32> = v.iter()
        .map(|x| x * 2)
        .filter(|x| *x > 5)
        .collect();
    println!("Result: {:?}", result);
    
    // find
    let option = v.iter()
.find(|&&x| x % 2 == 0);
    println!("First even: {:?}", option);
    
    // any
    let has_even = v.iter()
.any(|&x| x % 2 == 0);
    println!("Has even: {}", has_even);
    
    // fold
    let sum = v.iter()
.fold(0, |acc, x| acc + x);
    println!("Sum: {}", sum);
}
```

### Custom Iterator

```rust
struct Counter {
    count: u32,
}

impl Counter {
    fn new() -> Counter {
        Counter { count: 0 }
    }
}

impl Iterator for Counter {
    type Item = u32;
    
    fn next(&mut self) -> Option<Self::Item> {
        if self.count < 5 {
            self.count += 1;
            Some(self.count)
        } else {
            None
        }
    }
}

fn main() {
    let mut counter = Counter::new();
    
    println!("Counter:");
    for _ in 0..10 {
        println!("{}", counter.next().unwrap_or(0));
    }
    
    // Using with iterator methods
    let sum: u32 = Counter::new()
        .zip(Counter::new()
.skip(1))
        .map(|(a, b)| a * b)
        .filter(|x| x % 3 == 0)
        .sum();
    
    println!("Sum: {}", sum);
}
```

---

## Conclusion

This guide covers the essential Rust concepts you need to understand and write Rust code effectively. Here are some key takeaways:

1. **Ownership**: Rust's unique ownership system ensures memory safety without a garbage collector
2. **Borrowing**: References allow you to access data without taking ownership
3. **Pattern Matching**: `match` expressions provide powerful control flow
4. **Traits**: Define shared behavior in a flexible way
5. **Error Handling**: `Result` and `Option` enums force you to handle errors explicitly
6. **Closures**: Anonymous functions that can capture their environment
7. **Iterators**: Process sequences of elements efficiently

### Next Steps

- Practice by writing small programs
- Read "The Rust Programming Language" book: https://doc.rust-lang.org/book/
- Explore the Rust standard library: https://doc.rust-lang.org/std/
- Join the Rust community: https://www.rust-lang.org/community

### Resources

- [Rust Documentation](https://www.rust-lang.org/learn)
- [Rust by Example](https://doc.rust-lang.org/rust-by-example/)
- [Rustlings - Small exercises](https://github.com/rust-lang/rustlings)
- [Awesome Rust](https://github.com/rust-unofficial/awesome-rust)

Happy Rustacean coding! 🦀
