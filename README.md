# WEB103 Project 3 - *Virtual Community Space*

Submitted by: **Derrick Woodall**

About this web app: **This web application is a virtual community space that allows users to explore events happening in different locations through an interactive interface. The platform is built using React and connects to a PostgreSQL database that stores event information in a structured events table. Users can visually select from at least four locations on the interface to discover events that have occurred or are scheduled to occur there. Each location has its own dedicated detail page with a unique URL, where users can view a list of events associated with that specific place. The goal of the application is to help users easily find interesting activities and community events within the virtual environment.**

Time spent: **15** hours

## Required Features

The following **required** functionality is completed:

<!-- Make sure to check off completed functionality below -->

- [X] **The web app uses React to display data from the API**
- [X] **The web app is connected to a PostgreSQL database, with an appropriately structured Events table**
- [X]  **NOTE: Your walkthrough added to the README must include a view of your Render dashboard demonstrating that your Postgres database is available**
- [X]  **NOTE: Your walkthrough added to the README must include a demonstration of your table contents. Use the psql command 'SELECT * FROM tablename;' to display your table contents.**
- [X] **The web app displays a title.**
- [X] **Website includes a visual interface that allows users to select a location they would like to view.**
- [X] *Note: A non-visual list of links to different locations is insufficient.* 
- [X] **Each location has a detail page with its own unique URL.**
- [X] **Clicking on a location navigates to its corresponding detail page and displays list of all events from the `events` table associated with that location.**

The following **optional** features are implemented:

- [X] An additional page shows all possible events
- [X] Users can sort *or* filter events by location.
- [X] Events display a countdown showing the time remaining before that event
- [X] Events appear with different formatting when the event has passed (ex. negative time, indication the event has passed, crossed out, etc.).

The following **additional** features are implemented:

- [X] Admin login flow to secure edit/delete operations for database records
- [X] Admin dashboard with a left-side navigation between `Locations` and `Events`
- [X] Sorted clickable data list (name/title), with detail view and edit/delete controls

## Admin Access

- Login URL: `/admin/login`
- Admin dashboard URL: `/admin`
- Default admin credentials (if env vars are not set):
	- Username: `admin`
	- Password: `admin123`

You can override the defaults in `server/.env`:

- `ADMIN_USERNAME`
- `ADMIN_PASSWORD`
- `ADMIN_TOKEN`

## Video Walkthrough

Here's a walkthrough of implemented required features:

<h3>Walkthrough Videos</h3>

<img src="https://raw.githubusercontent.com/wiinc355/Virtual-Community-Space/main/VCS-A-My-Walkthough.gif" width="700">

<br><br>

<img src="https://raw.githubusercontent.com/wiinc355/Virtual-Community-Space/main/VSC-B-My-Walkthough.gif" width="700">

<br><br>

<img src="https://raw.githubusercontent.com/wiinc355/Virtual-Community-Space/main/VSC-C-My-Walkthough.gif" width="700">


<!-- Replace this with whatever GIF tool you used! -->
GIF created with ...  GIF tool here
<!-- Recommended tools:
[Kap](https://getkap.co/) for macOS
[ScreenToGif](https://www.screentogif.com/) for Windows
[peek](https://github.com/phw/peek) for Linux. -->

## Notes

Describe any challenges encountered while building the app or any additional context you'd like to add.

## License

Copyright [yyyy] [name of copyright owner]

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

> http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
