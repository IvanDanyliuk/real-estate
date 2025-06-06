import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  lng: 'en',
  fallbackLng: 'en',
  debug: false,
  resources: {
    en: {
      translation: {
        'main_layout.additionalFooterLinks.pagesSectionHeading': 'Pages',
        'main_layout.additionalFooterLinks.supportSectionHeading': 'Support',
        'main_layout.additionalFooterLinks.getUpdatedForm.heading': 'Stay Updated',
        'constants.regions.Kyiv': 'Kyiv',
        'pages.profile.deleteAccount.triggerBtn': 'Delete Account',
        'pages.profile.deleteAccount.title': 'Are you sure you want to delete your account?',
        'pages.profile.deleteAccount.acceptBtn': 'Confirm',
        'pages.profile.deleteAccount.cancelBtn': 'Cancel',
        'pages.profile.navMenu.personalInfo': 'Personal Info',
        'pages.profile.navMenu.myProperties': 'My Properties',
        'pages.profile.navMenu.likedProperties': 'Liked Properties',
        'pages.profile.profileForm.title': 'Edit Profile',
        'pages.profile.profileForm.nameLabel': 'Name',
        'pages.profile.profileForm.emailLabel': 'Email',
        'pages.profile.profileForm.phoneLabel': 'Phone',
        'pages.profile.profileForm.locationLabel': 'Location',
        'pages.profile.profileForm.submitBtn': 'Submit',
        'pages.profile.profilePhotoForm.openBtn': 'Open',
        'pages.profile.profilePhotoForm.title': 'Update Profile Photo',
        'pages.profile.profilePhotoForm.uploadBtn': 'Upload',
        'pages.profile.profilePhotoForm.submitBtn': 'Submit',
        'pages.profile.profilePhotoForm.loading': 'Loading...',
      },
    },
  },
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;