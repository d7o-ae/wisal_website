# Firebase Setup Instructions

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or select an existing project
3. Follow the setup wizard

## Step 2: Enable Firestore Database

1. In Firebase Console, go to **Build** > **Firestore Database**
2. Click "Create database"
3. Choose **Start in production mode** (or test mode for development)
4. Select a location for your database

## Step 3: Get Firebase Configuration

1. In Firebase Console, go to **Project Settings** (⚙️ icon)
2. Scroll down to "Your apps" section
3. Click the **Web** icon (`</>`) to add a web app
4. Register your app with a nickname (e.g., "Wisal Website")
5. Copy the `firebaseConfig` object

## Step 4: Update Configuration File

Open `src/firebase/config.ts` and replace the placeholder values with your actual Firebase config:

```typescript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890"
};
```

## Step 5: Set Firestore Security Rules

In Firebase Console > Firestore Database > Rules, update your rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow write to requests collection
    match /requests/{document} {
      allow write: if true; // Anyone can submit a request
      allow read: if false; // Only authenticated users can read (for admin panel later)
    }
  }
}
```

## Step 6: Test the Connection

1. Run the development server: `npm run dev`
2. Open the registration form and submit a test request
3. Check Firebase Console > Firestore Database to see if the document was created in the `requests` collection

## Data Structure

Each submission will create a document in the `requests` collection with the following fields:

```typescript
{
  schoolName: string
  responsiblePersonName: string
  responsiblePersonRole: string
  email: string
  websiteUrl: string
  phone: string // Format: "+966 5X XXX XXXX"
  country: string
  city: string
  studentsCount: string
  preferredOption: string
  preferredContactMethod: string
  commercialRecordFileName: string
  schoolLicenseFileName: string
  status: "pending"
  createdAt: Timestamp
}
```

## Optional: File Upload

For file uploads (commercial record and school license), you'll need to:

1. Enable **Firebase Storage**
2. Upload files to Storage
3. Save the download URLs in Firestore

This requires additional setup which can be added later.
