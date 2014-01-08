<?php
/**
 * Project: Captility
 * User: Daniel
 * Date: 03.01.14
 * Time: 16:19
 * Created with JetBrains PhpStorm.
 */
?>

<div class="navbar-header">
    <button type="button" class="navbar-toggle" data-toggle="collapse"
            data-target="#bs-example-navbar-collapse-1"><span
            class="sr-only">Toggle navigation</span><span class="icon-bar"></span><span
            class="icon-bar"></span><span class="icon-bar"></span></button>
    <?php echo $this->Html->link("Captility", array('controller' => 'calendars', 'action' => 'dashboard'),
        array('class' => 'navbar-brand')); //ToDo Variable für Titel benutzen ?>
</div>

<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
    <ul class="nav navbar-nav">

        <li <? if ($this->params['controller'] == "calendars" && $this->params['action'] == "dashboard") echo 'class="active"';?>>
            <?php echo $this->Html->link("Pinnwand", array('controller' => 'calendars', 'action' => 'dashboard')); ?>
        </li>
        <li class="divider"></li>

        <li <? if ($this->params['controller'] == "calendars" && $this->params['action'] == "index") echo 'class="active"';?>>
            <?php echo $this->Html->link("Kalender", array('controller' => 'calendars', 'action' => 'index')); ?>
        </li>

        <li class="divider"></li>

        <li class="dropdown <? if (in_array($this->params['controller'], array('captures', 'lectures', 'hosts', 'eventTypes'))) echo 'active'; ?>">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown">Verzeichnis<strong
                    class="caret"></strong></a>
            <ul class="dropdown-menu">

                <li role="presentation" class="dropdown-header list-info">Katalog verwalten...</li>
                <li>
                    <?php echo $this->Html->link("Veranstaltungen", array('controller' => 'lectures', 'action' => 'index')); ?>
                </li>
                <li>
                    <?php echo $this->Html->link("Veranstalter", array('controller' => 'hosts', 'action' => 'index')); ?>
                </li>
                <li>
                    <?php echo $this->Html->link("Aufzeichnungen", array('controller' => 'captures', 'action' => 'index')); ?>
                </li>
                <li>
                    <?php echo $this->Html->link("Aufzeichnungsarten", array('controller' => 'event_types', 'action' => 'index')); ?>
                </li>
            </ul>
        </li>

        <li class="dropdown <? if (in_array($this->params['controller'], array('tasks', 'workflows', 'tickets'))) echo 'active'; ?>">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown">Aufgaben<strong
                    class="caret"></strong></a>
            <ul class="dropdown-menu">
                <li role="presentation" class="dropdown-header list-info">Verwalten von...</li>
                <li>
                    <?php echo $this->Html->link("Full Calendar", array('controller' => 'full_calendar', 'action' => 'index')); ?>
                </li>
                <li>
                    <?php echo $this->Html->link("Tickets", array('controller' => 'tickets', 'action' => 'index')); ?>
                </li>
                <li>
                    <?php echo $this->Html->link("Aufgaben", array('controller' => 'tasks', 'action' => 'index')); ?>
                </li>
                <li>
                    <?php echo $this->Html->link("Workflows", array('controller' => 'workflows', 'action' => 'index')); ?>
                </li>
                <li class="divider">
                </li>
                <li class="disabled">
                    <?php echo $this->Html->link("Benutzern", array('controller' => 'users', 'action' => 'index')); ?>
                </li>
            </ul>
        </li>

    </ul>

    <form class="navbar-form navbar-right navbar-search" role="search">
        <div class="form-group">
            <input type="text" class="form-control btn-inverse">
        </div>
        <button type="submit" class="btn btn-inverse navbar-btn-search">Suche</button>
    </form>

    <ul class="nav navbar-nav navbar-right">

        <li class="dropdown">
            <a href="#" class="dropdown-toggle"
               data-toggle="dropdown"><?php echo $this->Session->read('Auth.User.username') . ' '; ?>
                <strong
                    class="caret"></strong></a>
            <ul class="dropdown-menu">
                <li role="presentation" class="dropdown-header list-info">Account bearbeiten.</li>
                <li>
                    <a href="#">Profil bearbeiten</a>
                </li>
                <li>
                    <?php echo $this->Html->link("Passwort ändern", array('controller' => 'users', 'action' => 'changePassword')); ?>
                </li>
                <li>
                    <a href="#">Benachrichtigungen</a>
                </li>
                <li class="divider">
                </li>
                <li>
                    <a href="#">Admin Center</a>
                </li>
                <li>
                    <?php echo $this->Html->link("Full Calendar", array('controller' => 'full_calendar', 'action' => 'index')); ?>
                </li>
                <li class="divider">
                </li>
                <li>
                    <?php echo $this->Html->link("Abmelden", array('controller' => 'users', 'action' => 'logout')); ?>
                </li>
            </ul>
        </li>
        <li>
            <?php echo $this->Html->link("Logout", array('controller' => 'users', 'action' => 'logout')); ?>
        </li>

    </ul>
</div>