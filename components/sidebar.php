<!-- Sidebar component + JavaScript functions for transition -->
<!-- To use this effectively, you NEED to have a #mainContent div for your main content! -->
<!-- If you are not using navbar.php, then you also need to include sidebar-button.php! -->
<!-- Reference Documentation: https://www.w3schools.com/howto/howto_js_collapse_sidebar.asp -->

<div id="mainSidebar" class="sidebar-main">
    <a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a>
    <a href="calendar.php">Calendar</a>
    <a href="tasks.php">My Tasks</a>
    <a href="personnel.php">Personnel</a>
    <a href="about-me.php">About Me</a>
</div>

<script>
var active = true; /* this sets the state of the navbar toggle status */

/* set the width of the container to 250px and the left
        margin of the page content to 250px */
function openNav() {
    document.getElementById('mainSidebar').style.width = '250px';
    document.getElementById('mainContent').style.marginLeft = '250px';
}

/* set the width of the sidebar to 0 and the left margin of the
page content to 0 */
function closeNav() {
    document.getElementById('mainSidebar').style.width = '0';
    document.getElementById('mainContent').style.marginLeft = '0';
    active = false;
}

/* toggle the navbar, using width 250px and margin of the page 250px */
function toggleNav() {
    ACTIVE = '250px';
    INACTIVE = '0px';

    var sidebar = document.getElementById('mainSidebar');
    var mainContent = document.getElementById('mainContent');

    if (!active) {
        sidebar.style.width = ACTIVE;
        mainContent.style.marginLeft = ACTIVE;
        active = true;
    } else {
        sidebar.style.width = INACTIVE;
        mainContent.style.marginLeft = INACTIVE;
        active = false;
    }
}
</script>