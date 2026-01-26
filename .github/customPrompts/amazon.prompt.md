# Amazon iPhone Search Test Plan

## Overview
This test plan covers the basic search functionality on the Amazon India website (https://www.amazon.in). The test will simulate a user searching for "iphone" products, validating the search results page, and ensuring key elements are present and functional.

## Test Suite: Search Functionality

### Test Case: Search for iPhone Products

**Test File:** specs/amazon-iphone-search.spec.ts

**Steps:**
1. Run this test file using the Playwright CLI:
    ```bash
   npx playwright test myPWTests/POM Framework/Utilities/auth.setup.ts -g "Amazon authentication setup" --project=newChromium --headed
   ```
2. Navigate to the Amazon India homepage at https://www.amazon.in
3. Locate the search input field (typically identified by placeholder text like "Search Amazon.in" or by its role as a searchbox)
4. Enter the search term "iphone" into the search field
5. Click the search button (magnifying glass icon or "Go" button)
6. Wait for the search results page to load
7. Validate that the page title contains "iphone" or "Amazon.in : iphone"
8. Verify that search results are displayed by checking for the presence of product listings
9. Validate key elements on the results page:
   - Product titles (should contain "iPhone" or related terms)
   - Product prices (should be displayed for each item)
   - Product images (thumbnails should be visible)
   - Add to Cart buttons or similar purchase options
   - Customer ratings/reviews (if available)
10. Ensure the search results count is greater than 0
11. Close the browser

**Expected Results:**
- The homepage loads successfully
- Search input accepts the "iphone" text
- Search button is clickable and triggers the search
- Search results page loads within a reasonable time (e.g., 10 seconds)
- Page title reflects the search term
- At least one product listing is visible
- Each product listing includes a title, price, and image
- Purchase options (like Add to Cart) are present
- No error messages are displayed on the results page
- Browser closes cleanly without errors

**Additional Notes:**
- Use appropriate waits (e.g., waitForLoadState('networkidle')) to ensure page stability
- Handle potential CAPTCHA or login prompts if they appear
- Test on a standard desktop viewport (1920x1080)
- Include screenshots on failure for debugging