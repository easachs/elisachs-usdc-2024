// BOOKSEARCH FUNCTION

function findSearchTermInBooks(searchTerm, scannedTextObj, caseSensitive = true) {
    // Construct result object
    var result = {
        "SearchTerm": searchTerm,
        "Results": []
    };

    // Check for valid searchTerm and scannedTextObj
    if (typeof searchTerm === "string" && searchTerm !== "" &&
       Array.isArray(scannedTextObj) && scannedTextObj.every(isValidBook)) {
        scannedTextObj.forEach(book => { // Iterate through each book
            book.Content.forEach(content => { // Iterate through book's contents
                // Check case sensitivity
                var casedSearch = caseSensitive ? searchTerm : searchTerm.toLowerCase();
                var casedText = caseSensitive ? content.Text : content.Text.toLowerCase();

                if (casedText.includes(casedSearch)) { // Check for search term
                    result.Results.push({ // Add matching results
                        "ISBN": book.ISBN,
                        "Page": content.Page,
                        "Line": content.Line
                    });
                };
            });
        });
    };
    
    return result;
}

function isValidBook(book) {
    return typeof book === "object" && book.Content &&
           Array.isArray(book.Content) &&
           book.Content.every(content => typeof content.Text === "string");
}

// Example input
const twentyLeaguesIn = [
    {
        "Title": "Twenty Thousand Leagues Under the Sea",
        "ISBN": "9780000528531",
        "Content": [
            {
                "Page": 31,
                "Line": 8,
                "Text": "now simply went on by her own momentum.  The dark-"
            },
            {
                "Page": 31,
                "Line": 9,
                "Text": "ness was then profound; and however good the Canadian\'s"
            },
            {
                "Page": 31,
                "Line": 10,
                "Text": "eyes were, I asked myself how he had managed to see, and"
            } 
        ] 
    }
]

// UNIT TESTS

function constructResults(searchTerm, lines) {
    // ex: constructResults("and", [9, 10]);
    return {
        "SearchTerm": searchTerm,
        "Results": lines.map(line => ({
        "ISBN": "9780000528531",
        "Page": 31,
        "Line": line
        }))
    };
};

function noResults(searchTerm) {
    return {
        "SearchTerm": searchTerm,
        "Results": []
    };
};

// One result
const twentyLeaguesThe = constructResults("the", [9]);
// Output
const test1result = findSearchTermInBooks("the", twentyLeaguesIn);

if (JSON.stringify(twentyLeaguesThe) === JSON.stringify(test1result)) {
    console.log("PASS: Output");
} else {
    console.log("FAIL: Output");
    console.log("Expected:", twentyLeaguesThe);
    console.log("Received:", test1result);
}

// Length
const test2result = findSearchTermInBooks("the", twentyLeaguesIn);

if (test2result.Results.length == 1) {
    console.log("PASS: Length");
} else {
    console.log("FAIL: Length");
    console.log("Expected:", twentyLeaguesThe.Results.length);
    console.log("Received:", test2result.Results.length);
}

// Multiple
const twentyLeaguesAnd = constructResults("and", [9, 10]);
const test3result = findSearchTermInBooks("and", twentyLeaguesIn);

if (JSON.stringify(twentyLeaguesAnd) === JSON.stringify(test3result)) {
    console.log("PASS: Multiple");
} else {
    console.log("FAIL: Multiple");
    console.log("Expected:", twentyLeaguesAnd);
    console.log("Received:", test3result);
}

// Negative
const twentyLeaguesNone = constructResults("eggplant", []);
const test4result = findSearchTermInBooks("eggplant", twentyLeaguesIn);

if (JSON.stringify(twentyLeaguesNone) === JSON.stringify(test4result)) {
    console.log("PASS: No results");
} else {
    console.log("FAIL: No results");
    console.log("Expected:", twentyLeaguesNone);
    console.log("Received:", test4result);
}

// Case-sensitive
const twentyLeaguesSensitive = constructResults("The", [8]);
const test5result = findSearchTermInBooks("The", twentyLeaguesIn);

if (JSON.stringify(twentyLeaguesSensitive) === JSON.stringify(test5result)) {
    console.log("PASS: Case sensitive");
} else {
    console.log("FAIL: Case sensitive");
    console.log("Expected:", twentyLeaguesSensitive);
    console.log("Received:", test5result);
}

// Case-insensitive
const twentyLeaguesInsensitive = constructResults("THE", [8, 9]);
const test6result = findSearchTermInBooks("THE", twentyLeaguesIn, false);

if (JSON.stringify(twentyLeaguesInsensitive) === JSON.stringify(test6result)) {
    console.log("PASS: Case insensitive");
} else {
    console.log("FAIL: Case insensitive");
    console.log("Expected:", twentyLeaguesInsensitive);
    console.log("Received:", test6result);
}

// Punctuation
const twentyLeaguesProfound = constructResults("profound", [9]);
const test7result = findSearchTermInBooks("profound", twentyLeaguesIn);

if (JSON.stringify(twentyLeaguesProfound) === JSON.stringify(test7result)) {
    console.log("PASS: Punctuation");
} else {
    console.log("FAIL: Punctuation");
    console.log("Expected:", twentyLeaguesProfound);
    console.log("Received:", test7result);
}

// Multiword
const twentyLeaguesSimplyWentOn = constructResults("simply went on", [8]);
const test8result = findSearchTermInBooks("simply went on", twentyLeaguesIn);

if (JSON.stringify(twentyLeaguesSimplyWentOn) === JSON.stringify(test8result)) {
    console.log("PASS: Multiword");
} else {
    console.log("FAIL: Multiword");
    console.log("Expected:", twentyLeaguesSimplyWentOn);
    console.log("Received:", test8result);
}

// Partial word
const twentyLeaguesHow = constructResults("how", [9, 10]);
const test9result = findSearchTermInBooks("how", twentyLeaguesIn);

if (JSON.stringify(twentyLeaguesHow) === JSON.stringify(test9result)) {
    console.log("PASS: Partial word");
} else {
    console.log("FAIL: Partial word");
    console.log("Expected:", twentyLeaguesHow);
    console.log("Received:", test9result);
}

// Sad path tests

// Empty search
const emptySearch = noResults("");
const test10result = findSearchTermInBooks("", twentyLeaguesIn);

if (JSON.stringify(emptySearch) === JSON.stringify(test10result)) {
    console.log("PASS: Empty search");
} else {
    console.log("FAIL: Empty search");
    console.log("Expected:", emptySearch);
    console.log("Received:", test10result);
}

// Null search
const nullSearch = noResults(null);
const test11result = findSearchTermInBooks(null, twentyLeaguesIn);

if (JSON.stringify(nullSearch) === JSON.stringify(test11result)) {
    console.log("PASS: Null search");
} else {
    console.log("FAIL: Null search");
    console.log("Expected:", nullSearch);
    console.log("Received:", test11result);
}

// Null object
const nullObject = noResults("eggplant");
const test12result = findSearchTermInBooks("eggplant", null);

if (JSON.stringify(nullObject) === JSON.stringify(test12result)) {
    console.log("PASS: Null object");
} else {
    console.log("FAIL: Null object");
    console.log("Expected:", nullObject);
    console.log("Received:", test12result);
}

// Bad content
const badObject = [
    {
        "Title": "Twenty Thousand Leagues Under the Sea",
        "ISBN": "9780000528531",
        "Content": "now simply went on by her own momentum.  The dark-"
    }
];

const badContent = noResults("eggplant");
const test13result = findSearchTermInBooks("eggplant", badObject);

if (JSON.stringify(badContent) === JSON.stringify(test13result)) {
    console.log("PASS: Bad content");
} else {
    console.log("FAIL: Bad content");
    console.log("Expected:", badContent);
    console.log("Received:", test13result);
}

// Bad text
const anotherBadObject = [
    {
        "Title": "Twenty Thousand Leagues Under the Sea",
        "ISBN": "9780000528531",
        "Content": [
            { "Text": [] }
        ] 
    }
];

const moreBadContent = noResults("eggplant");
const test14result = findSearchTermInBooks("eggplant", anotherBadObject);

if (JSON.stringify(moreBadContent) === JSON.stringify(test14result)) {
    console.log("PASS: Bad text");
} else {
    console.log("FAIL: Bad text");
    console.log("Expected:", moreBadContent);
    console.log("Received:", test14result);
}

// Multiple books
const monteCristo = {
    "Title": "The Count of Monte Cristo",
    "ISBN": "9781593080884",
    "Content": [
        {
            "Page":618,
            "Line": 18,
            "Text": '"My dear," replied Valentine, "has not the count just'
        },
        {
            "Page": 618,
            "Line": 19,
            "Text": "told us that all human wisdom is contained in the words"
        },
        {
            "Page": 618,
            "Line": 20,
            "Text": "'Wait and Hope!'\""
        } 
    ] 
}

const multipleBooks = [ ...twentyLeaguesIn ];
multipleBooks.push(monteCristo);

const multipleResults = { ...twentyLeaguesAnd };
multipleResults.Results.push({
    ISBN: "9781593080884",
    Page: 618,
    Line: 20
});

const test15result = findSearchTermInBooks("and", multipleBooks);

if (JSON.stringify(multipleResults) === JSON.stringify(test15result)) {
    console.log("PASS: Multiple books");
} else {
    console.log("FAIL: Multiple books");
    console.log("Expected:", multipleResults);
    console.log("Received:", test15result);
}

// No books
const noBooks = noResults("and");
const test16result = findSearchTermInBooks("and", []);

if (JSON.stringify(noBooks) === JSON.stringify(test16result)) {
    console.log("PASS: No books");
} else {
    console.log("FAIL: No books");
    console.log("Expected:", noBooks);
    console.log("Received:", test16result);
}

// ConstructResults function
const twentyLeaguesOut = {
    "SearchTerm": "the",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 9
        }
    ]
}

const test17result = constructResults("the", [9]);
if (JSON.stringify(twentyLeaguesOut) === JSON.stringify(test17result)) {
    console.log("PASS: Construct results");
} else {
    console.log("FAIL: Construct results");
    console.log("Expected:", twentyLeaguesOut);
    console.log("Received:", test17result);
}
