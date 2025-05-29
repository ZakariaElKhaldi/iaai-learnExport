// Mock data for programming languages
export const MOCK_LANGUAGES = [
  {
    id: "javascript",
    name: "JavaScript",
    extension: "js",
    icon: "🟨",
    color: "text-yellow-500"
  },
  {
    id: "typescript",
    name: "TypeScript",
    extension: "ts",
    icon: "🔷",
    color: "text-blue-500"
  },
  {
    id: "python",
    name: "Python",
    extension: "py",
    icon: "🐍",
    color: "text-green-500"
  },
  {
    id: "java",
    name: "Java",
    extension: "java",
    icon: "☕",
    color: "text-orange-500"
  },
  {
    id: "cpp",
    name: "C++",
    extension: "cpp",
    icon: "⚙️",
    color: "text-blue-600"
  },
  {
    id: "go",
    name: "Go",
    extension: "go",
    icon: "🔵",
    color: "text-cyan-500"
  },
  {
    id: "ruby",
    name: "Ruby",
    extension: "rb",
    icon: "💎",
    color: "text-red-500"
  }
];

// Mock data for test results
export const MOCK_TEST_RESULTS = [
  {
    id: 1,
    input: "nums = [2, 7, 11, 15], target = 9",
    expected: "[0, 1]",
    output: "[0, 1]",
    status: "passed",
    hidden: false
  },
  {
    id: 2,
    input: "nums = [3, 2, 4], target = 6",
    expected: "[1, 2]",
    output: "[1, 2]",
    status: "passed",
    hidden: false
  },
  {
    id: 3,
    input: "nums = [3, 3], target = 6",
    expected: "[0, 1]",
    output: "[0, 1]",
    status: "passed",
    hidden: false
  },
  {
    id: 4,
    input: "nums = [1, 2, 3, 4, 5], target = 9",
    expected: "[3, 4]",
    output: "[3, 4]",
    status: "passed",
    hidden: true
  },
  {
    id: 5,
    input: "nums = [-1, -2, -3, -4, -5], target = -8",
    expected: "[2, 4]",
    output: "[3, 4]",
    status: "failed",
    hidden: false
  }
] as const;

// Mock data for coding problems
export const MOCK_PROBLEMS = [
  {
    id: 1,
    title: "Two Sum",
    difficulty: "Easy",
    tags: ["Array", "Hash Table"],
    description: `Given an array of integers \`nums\` and an integer \`target\`, return *indices* of the two numbers such that they add up to \`target\`.

You may assume that each input would have **exactly one solution**, and you may not use the *same* element twice.

You can return the answer in any order.

### Example:
\`\`\`
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
\`\`\`

### Approach:
Consider using a hash map to track numbers you've seen so far, which gives you O(n) time complexity.`,
    constraints: [
      "2 <= nums.length <= 10^4",
      "-10^9 <= nums[i] <= 10^9",
      "-10^9 <= target <= 10^9",
      "**Only one** valid answer exists."
    ],
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "Because `nums[0] + nums[1] == 9`, we return `[0, 1]`."
      },
      {
        input: "nums = [3,2,4], target = 6",
        output: "[1,2]",
        explanation: "The sum of `2` and `4` is `6`, so we return indices `[1, 2]`."
      },
      {
        input: "nums = [3,3], target = 6",
        output: "[0,1]",
        explanation: "Both elements at index `0` and `1` are the same value (`3`), and they sum to `6`."
      }
    ],
    hints: [
      "A **brute force** approach would be to check every pair of numbers in the array using nested loops, but this would be O(n²).",
      "To optimize, consider if the *complement* (`target - current number`) exists in the array. How would you check this efficiently?",
      "Using a **hash map** can help you find the complement in O(1) time. Create a map, iterate through the array, check if the complement exists in the map, and if not, add the current number."
    ],
    acceptance: 48,
    completedBy: 1245678,
    likes: 36249,
    submissions: 7500123,
    companies: ["Amazon", "Google", "Apple", "Microsoft", "Facebook"],
    time_complexity: "O(n)",
    space_complexity: "O(n)",
    solution_approaches: ["Hash Map", "Two Pointers"],
    completedAt: "2025-01-15",
    completed: true,
    started: true,
    progressPercentage: 100,
    isBookmarked: true,
    isPremium: false,
    isFeatured: true,
    starterCode: {
      javascript: `function twoSum(nums, target) {
  // Your code here
}`,
      python: `def twoSum(nums, target):
    # Your code here
    pass`,
      java: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Your code here
        return new int[]{};
    }
}`
    }
  },
  {
    id: 2,
    title: "Add Two Numbers",
    difficulty: "Medium",
    tags: ["Linked List", "Math", "Recursion"],
    description: `You are given two **non-empty** linked lists representing two non-negative integers. The digits are stored in **reverse order**, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.

You may assume the two numbers do not contain any leading zero, except the number 0 itself.

### Linked List Representation
The linked lists represent numbers in reverse order:
* \`2->4->3\` represents the number \`342\`
* \`5->6->4\` represents the number \`465\`

### Example Visualization:
\`\`\`
  2 -> 4 -> 3
+ 5 -> 6 -> 4
-----------
  7 -> 0 -> 8
\`\`\`

The sum is \`342 + 465 = 807\`, represented as \`7->0->8\`.`,
    constraints: [
      "The number of nodes in each linked list is in the range [1, 100].",
      "0 <= Node.val <= 9",
      "It is guaranteed that the list represents a number that does not have leading zeros."
    ],
    examples: [
      {
        input: "l1 = [2,4,3], l2 = [5,6,4]",
        output: "[7,0,8]",
        explanation: "342 + 465 = 807."
      },
      {
        input: "l1 = [0], l2 = [0]",
        output: "[0]"
      },
      {
        input: "l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]",
        output: "[8,9,9,9,0,0,0,1]"
      }
    ],
    hints: [
      "Keep track of the carry using a variable.",
      "Simulate digits-by-digits sum starting from the head of the list, which contains the least significant digit.",
      "Make sure to handle the case where one list is longer than the other."
    ], 
    acceptance: 38,
    completedBy: 3250000,
    likes: 21300,
    companies: ["Amazon", "Microsoft", "Facebook", "Bloomberg"],
    time_complexity: "O(max(m,n))",
    space_complexity: "O(max(m,n))",
    submissions: 8500000,
    solution_approaches: ["Elementary Math", "Recursion"],
    completed: false,
    started: true,
    progressPercentage: 65,
    isBookmarked: false,
    isPremium: false,
    isFeatured: true
  },
  {
    id: 3,
    title: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    tags: ["Hash Table", "String", "Sliding Window"],
    description: `Given a string \`s\`, find the length of the **longest substring** without repeating characters.

A **substring** is a contiguous sequence of characters within a string.

### Example Analysis:
For the input \`"abcabcbb"\`:
- The substring \`"abc"\` has no repeating characters
- The substring \`"bca"\` has no repeating characters
- The substring \`"cab"\` has no repeating characters
- The longest of these is \`"abc"\` with length 3

| Input | Substrings | Longest |
|-------|------------|---------|
| "abcabcbb" | "abc", "bca", "cab", ... | "abc" (3) |
| "bbbbb" | "b" | "b" (1) |
| "pwwkew" | "pw", "wke", ... | "wke" (3) |

### Algorithm Approach:
The sliding window technique is effective for this problem:
1. Use a window that expands to the right
2. When a duplicate is found, contract from the left
3. Track the max window size as you go`,
    constraints: [
      "0 <= s.length <= 5 * 10^4",
      "s consists of English letters, digits, symbols and spaces."
    ],
    examples: [
      {
        input: 's = "abcabcbb"',
        output: "3",
        explanation: "The answer is 'abc', with the length of 3."
      },
      {
        input: 's = "bbbbb"',
        output: "1",
        explanation: "The answer is 'b', with the length of 1."
      },
      {
        input: 's = "pwwkew"',
        output: "3",
        explanation: "The answer is 'wke', with the length of 3. Notice that the answer must be a substring, 'pwke' is a subsequence and not a substring."
      }
    ],
    hints: [
      "Use a sliding window approach.",
      "Keep track of characters in the current window using a hash map or set.",
      "When you encounter a duplicate character, shrink the window from the left."
    ],
    acceptance: 33,
    completedBy: 4120000,
    likes: 25600,
    companies: ["Amazon", "Google", "Bloomberg", "Facebook", "Adobe"],
    time_complexity: "O(n)",
    space_complexity: "O(min(m,n))",
    submissions: 12450000,
    solution_approaches: ["Brute Force", "Sliding Window", "Optimized Sliding Window"],
    completed: false,
    isBookmarked: true,
    isPremium: false,
    isFeatured: false
  },
  {
    id: 4,
    title: "Median of Two Sorted Arrays",
    difficulty: "Hard",
    tags: ["Array", "Binary Search", "Divide and Conquer"],
    description: `Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.

The overall run time complexity should be O(log (m+n)).`,
    constraints: [
      "nums1.length == m",
      "nums2.length == n",
      "0 <= m <= 1000",
      "0 <= n <= 1000",
      "1 <= m + n <= 2000",
      "-10^6 <= nums1[i], nums2[i] <= 10^6"
    ],
    examples: [
      {
        input: "nums1 = [1,3], nums2 = [2]",
        output: "2.00000",
        explanation: "merged array = [1,2,3] and median is 2."
      },
      {
        input: "nums1 = [1,2], nums2 = [3,4]",
        output: "2.50000",
        explanation: "merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5."
      }
    ],
    hints: [
      "Think about how to find the median in a single sorted array first.",
      "The median divides the array into two equal halves.",
      "Try to partition both arrays such that elements on the left are smaller than elements on the right."
    ],
    acceptance: 32,
    completedBy: 1720000,
    likes: 18900,
    companies: ["Google", "Amazon", "Facebook", "Microsoft", "Adobe"],
    time_complexity: "O(log(min(m,n)))",
    space_complexity: "O(1)",
    submissions: 5350000,
    solution_approaches: ["Merge and Find", "Binary Search"],
    completed: false,
    isBookmarked: false,
    isPremium: true,
    isFeatured: false
  },
  {
    id: 5,
    title: "Longest Palindromic Substring",
    difficulty: "Medium",
    tags: ["String", "Dynamic Programming"],
    description: `Given a string s, return the longest palindromic substring in s.`,
    constraints: [
      "1 <= s.length <= 1000",
      "s consist of only digits and English letters."
    ],
    examples: [
      {
        input: 's = "babad"',
        output: '"bab"',
        explanation: '"aba" is also a valid answer.'
      },
      {
        input: 's = "cbbd"',
        output: '"bb"'
      }
    ],
    hints: [
      "Consider expanding around each character as a center of a potential palindrome.",
      "A palindrome can be centered on a single character or between two characters.",
      "Dynamic programming can be used to store whether substrings are palindromes."
    ],
    acceptance: 31,
    completedBy: 2980000,
    likes: 20100,
    companies: ["Amazon", "Microsoft", "Google", "Adobe"],
    time_complexity: "O(n^2)",
    space_complexity: "O(1)",
    submissions: 9620000,
    solution_approaches: ["Brute Force", "Dynamic Programming", "Expand Around Center", "Manacher's Algorithm"],
    completed: true,
    isBookmarked: false,
    isPremium: false,
    isFeatured: false
  },
  {
    id: 6,
    title: "Regular Expression Matching",
    difficulty: "Hard",
    tags: ["String", "Dynamic Programming", "Recursion"],
    description: `Given an input string s and a pattern p, implement regular expression matching with support for '.' and '*' where:

- '.' Matches any single character.
- '*' Matches zero or more of the preceding element.

The matching should cover the entire input string (not partial).`,
    constraints: [
      "1 <= s.length <= 20",
      "1 <= p.length <= 30",
      "s contains only lowercase English letters.",
      "p contains only lowercase English letters, '.', and '*'.",
      "It is guaranteed for each appearance of the character '*', there will be a previous valid character to match."
    ],
    examples: [
      {
        input: 's = "aa", p = "a"',
        output: "false",
        explanation: '"a" does not match the entire string "aa".'
      },
      {
        input: 's = "aa", p = "a*"',
        output: "true",
        explanation: '"*" means zero or more of the preceding element, "a". Therefore, by repeating "a" once, it becomes "aa".'
      },
      {
        input: 's = "ab", p = ".*"',
        output: "true",
        explanation: '".*" means "zero or more (*) of any character (.)".'
      }
    ],
    hints: [
      "The problem can be solved using dynamic programming.",
      "Define a state dp[i][j] which indicates whether s[0..i-1] matches p[0..j-1].",
      "Consider different cases when the pattern has '*'."
    ],
    acceptance: 28,
    completedBy: 980000,
    likes: 9800,
    companies: ["Google", "Facebook", "Amazon", "Microsoft"],
    time_complexity: "O(m*n)",
    space_complexity: "O(m*n)",
    submissions: 3500000,
    solution_approaches: ["Recursion with Memoization", "Dynamic Programming", "Bottom-up DP"],
    completed: false,
    isBookmarked: false,
    isPremium: true,
    isFeatured: false
  },
  {
    id: 7,
    title: "Container With Most Water",
    difficulty: "Medium",
    tags: ["Array", "Two Pointers", "Greedy"],
    description: `You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]).

Find two lines that together with the x-axis form a container, such that the container contains the most water.

Return the maximum amount of water a container can store.

Notice that you may not slant the container.`,
    constraints: [
      "n == height.length",
      "2 <= n <= 10^5",
      "0 <= height[i] <= 10^4"
    ],
    examples: [
      {
        input: "height = [1,8,6,2,5,4,8,3,7]",
        output: "49",
        explanation: "The maximum area is obtained by the heights [8,7] with width 7."
      },
      {
        input: "height = [1,1]",
        output: "1"
      }
    ],
    hints: [
      "Try using two pointers, one at the beginning and one at the end of the array.",
      "The area is limited by the shorter line.",
      "Move the pointer pointing to the shorter line to find a potentially larger area."
    ],
    acceptance: 53,
    completedBy: 1850000,
    likes: 17800,
    companies: ["Amazon", "Google", "Adobe", "Apple"],
    time_complexity: "O(n)",
    space_complexity: "O(1)",
    submissions: 3480000,
    solution_approaches: ["Brute Force", "Two Pointer Approach"],
    completed: true,
    isBookmarked: true,
    isPremium: false,
    isFeatured: true
  },
  {
    id: 8,
    title: "Integer to Roman",
    difficulty: "Medium",
    tags: ["Hash Table", "Math", "String"],
    description: `Roman numerals are represented by seven different symbols: I, V, X, L, C, D and M.

Symbol       Value
I            1
V            5
X            10
L            50
C            100
D            500
M            1000

For example, 2 is written as II in Roman numeral, just two one's added together. 12 is written as XII, which is simply X + II. The number 27 is written as XXVII, which is XX + V + II.

Roman numerals are usually written largest to smallest from left to right. However, the numeral for four is not IIII. Instead, the number four is written as IV. Because the one is before the five we subtract it making four. The same principle applies to the number nine, which is written as IX.

Given an integer, convert it to a roman numeral.`,
    constraints: [
      "1 <= num <= 3999"
    ],
    examples: [
      {
        input: "num = 3",
        output: '"III"',
        explanation: "3 is represented as 3 ones."
      },
      {
        input: "num = 58",
        output: '"LVIII"',
        explanation: "L = 50, V = 5, III = 3."
      },
      {
        input: "num = 1994",
        output: '"MCMXCIV"',
        explanation: "M = 1000, CM = 900, XC = 90 and IV = 4."
      }
    ],
    hints: [
      "Create a mapping for all possible values.",
      "Start from the largest value and work your way down.",
      "Be careful with special cases like 4, 9, 40, 90, etc."
    ],
    acceptance: 58,
    completedBy: 1250000,
    likes: 6300,
    companies: ["Amazon", "Microsoft", "Bloomberg"],
    time_complexity: "O(1)",
    space_complexity: "O(1)",
    submissions: 2150000,
    solution_approaches: ["Greedy", "String Builder"],
    completed: false,
    started: true,
    progressPercentage: 30,
    isBookmarked: false,
    isPremium: false,
    isFeatured: false
  },
  {
    id: 9,
    title: "3Sum",
    difficulty: "Medium",
    tags: ["Array", "Two Pointers", "Sorting"],
    description: `Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.

Notice that the solution set must not contain duplicate triplets.`,
    constraints: [
      "3 <= nums.length <= 3000",
      "-10^5 <= nums[i] <= 10^5"
    ],
    examples: [
      {
        input: "nums = [-1,0,1,2,-1,-4]",
        output: "[[-1,-1,2],[-1,0,1]]",
        explanation: "The distinct triplets are [-1,0,1] and [-1,-1,2]. Notice that the order of the output and the order of the triplets does not matter."
      },
      {
        input: "nums = [0,1,1]",
        output: "[]",
        explanation: "The only possible triplet does not sum up to 0."
      },
      {
        input: "nums = [0,0,0]",
        output: "[[0,0,0]]",
        explanation: "The only possible triplet sums up to 0."
      }
    ],
    hints: [
      "Sort the array first to handle duplicates easily.",
      "For each element, use two pointers to find pairs that sum to the negative of the current element.",
      "Be careful to skip duplicate values to avoid duplicate triplets."
    ],
    acceptance: 31,
    completedBy: 2650000,
    likes: 21200,
    companies: ["Amazon", "Facebook", "Microsoft", "Apple", "Bloomberg"],
    time_complexity: "O(n^2)",
    space_complexity: "O(n)",
    submissions: 8520000,
    solution_approaches: ["Sorting and Two Pointers", "Hash Set"],
    completed: true,
    isBookmarked: false,
    isPremium: false,
    isFeatured: false
  },
  {
    id: 10,
    title: "Letter Combinations of a Phone Number",
    difficulty: "Medium",
    tags: ["Hash Table", "String", "Backtracking", "Recursion"],
    description: `Given a string containing digits from 2-9 inclusive, return all possible letter combinations that the number could represent. Return the answer in any order.

A mapping of digits to letters (just like on the telephone buttons) is given below. Note that 1 does not map to any letters.`,
    constraints: [
      "0 <= digits.length <= 4",
      "digits[i] is a digit in the range ['2', '9']."
    ],
    examples: [
      {
        input: 'digits = "23"',
        output: '["ad","ae","af","bd","be","bf","cd","ce","cf"]'
      },
      {
        input: 'digits = ""',
        output: "[]"
      },
      {
        input: 'digits = "2"',
        output: '["a","b","c"]'
      }
    ],
    hints: [
      "Map each digit to its corresponding letters.",
      "Use backtracking or recursion to generate all combinations.",
      "You can also use a queue for a BFS approach."
    ],
    acceptance: 52,
    completedBy: 1580000,
    likes: 11500,
    companies: ["Amazon", "Google", "Facebook", "Microsoft", "Uber"],
    time_complexity: "O(4^n)",
    space_complexity: "O(n)",
    submissions: 3050000,
    solution_approaches: ["Backtracking", "BFS using Queue"],
    completed: false,
    isBookmarked: false,
    isPremium: false,
    isFeatured: false
  }
]; 