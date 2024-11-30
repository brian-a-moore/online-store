# Remaining Work
A list of remaining work items to complete before version 0.1 release.

## Full Stack
- Stripe Integration
- Sale/Order/Redemption flow

## API
- Add permissions for each route that needs them
- Copy AWS setup from Rail
- Copy GitLab setup from Rail
- Creating QR code and sending in email when an item is redeemable
- Route to verify/redeem the codes

## MOCKS
N/A

## UI
- Prevent the logged in user from deleting themselves from the team
  - [ ] The button should not appear in the form at the top right corner
- Prevent the logged in user from changing their own role
  - [ ] Perhaps the option to view the TeamMemberEdit form should just not show up for the logged in user?
- Add page or dialog to allow the logged in user to change their password
  - [ ] Probably need a button in the top-right corner that does this as well as sign out
- Add two custom image upload components that will allow users to update image and banner images
  - [x] Custom Image Component
  - [x] Update Image and BannerImage components to have a button to open a form
  - [ ] Custom Image Uploader Form
  - [ ] Prevent form button from showing up if the user is not of the right role
- Revamp the navigation menu for the admin portal
  - [ ] The current navigation will not work on small screens
- Do something with the home page for the admin portal
  - [ ] There is currently nothing showing on this page, either add something or redirect to another page
- The public portal needs navigation
  - [ ] Currently no way to move back and forth between screen other than using the browser navigation controls
- Store page for checking/redeeming purchases (QR code scanner)
- Update to React Router v7
  -  [ ] This is optional for now
- Store, Product and Items should show placeholder image if no image is defined