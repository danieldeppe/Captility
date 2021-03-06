<? if ($this->Session->read('Auth.User.user_id') === h($user['User']['user_id'])): ?>

    <? $this->Breadcrumbs->addCrumb('<span class="glyphicon glyphicon-user"></span>'.__('Users'), '/users', array('class' => 'active')); ?>
    <? $this->Breadcrumbs->addCrumb(h($this->Session->read('Auth.User.username')), '/users/view/' . $this->Session->read('Auth.User.user_id')); ?>
    <? $this->Breadcrumbs->addCrumb('<span class="glyphicon el-icon-address-book-alt"></span>'.__('My Profile'), '/users/profile/' . $this->Session->read('Auth.User.user_id')); ?>


<? else: ?>

    <? $this->Breadcrumbs->addCrumb('<span class="glyphicon el-icon-myspace"></span>'.__('User Registry'), '/admin_center'); ?>
    <? $this->Breadcrumbs->addCrumb('<span class="glyphicon glyphicon-user"></span>'.__('Users'), '/users', array('class' => 'active')); ?>
    <? $this->Breadcrumbs->addCrumb(h($user['User']['username']), '#', array('class' => 'active')); ?>

<? endif; ?>

<!--<div class=" view">-->
<div class="row">
    <div class="col-md-1 column">
     <div class="glyphicon-headline hidden-sm hidden-xs"><span class="glyphicon glyphicon-user"></span></div>
    </div>
    <div class="col-md-11 column">
        <div class="page-header">
            <h1><?php echo h($user['User']['username']) ?></h1>
        </div>
    </div>
</div>

<!--<div class="row">-->


<div class="col-md-1 column">
</div>
<div class="col-md-8 column actions-column">

<?php echo $this->Session->flash(); ?>    <?php echo $this->Session->flash('auth'); ?>
<div class="panel panel-default">
    <table cellpadding="0" cellspacing="0" class="table table-striped">
        <tbody>
        <tr>
            <th><?php echo __('User Id'); ?></th>
            <td>
                <?php echo h($user['User']['user_id']); ?>
                &nbsp;
            </td>
        </tr>
        <tr>
            <th><?php echo __('Username'); ?></th>
            <td>
                <?php echo h($user['User']['username']); ?>
                &nbsp;
            </td>
        </tr>
        <tr>
            <th><?php echo __('Email'); ?></th>
            <td>
                <?php echo h($user['User']['email']); ?>
                &nbsp;
            </td>
        </tr>
        <tr>
            <th><?php echo __('Language'); ?></th>
            <td>
                <?php echo h($user['User']['language']); ?>
                &nbsp;
            </td>
        </tr>
        <tr>
            <th><?php echo __('Avatar'); ?></th>
            <td>
                <?php echo h($user['User']['avatar']); ?>
                &nbsp;
            </td>
        </tr>
        <tr>
            <th><?php echo __('Created'); ?></th>
            <td>
                <?php echo h($user['User']['created']); ?>
                &nbsp;
            </td>
        </tr>
        <tr>
            <th><?php echo __('Modified'); ?></th>
            <td>
                <?php echo h($user['User']['modified']); ?>
                &nbsp;
            </td>
        </tr>
        <tr>
            <th><?php echo __('Group'); ?></th>
            <td>
                <?php echo $this->Html->link($user['Group']['name'], array('controller' => 'groups', 'action' => 'view', $user['Group']['group_id'])); ?>
                &nbsp;
            </td>
        </tr>
        <tr>
            <th><?php echo '<span class="glyphicon el-icon-rss"></span>'.__('Notification'); ?></th>
            <td><?php if (h($user['User']['notification'] <= 0)): echo '<span class="glyphicon glyphicon-ban-circle"></span>'; ?>
                <?php else: echo '<span class="glyphicon glyphicon-ok"></span>'; ?><?php endif; ?>
            </td>
        </tr>
        </tbody>
    </table>
</div>

<hr/>

<div class="related row">
    <div class="col-md-12">
        <h3><?php echo __('Related Captures'); ?></h3>
        <?php if (!empty($user['Capture'])): ?>                 <div class="panel panel-primary">
                <!-- Default panel contents -->

                <table cellpadding="0" cellspacing="0" class="table table-striped table-responsive">
                    <thead class="panel-heading">
                    <tr>
                        <th><?php echo __('Name'); ?></th>
                        <th><?php echo __('Status'); ?></th>
                        <th><?php echo __('User'); ?></th>
                        <th><?php echo __('Workflow'); ?></th>
                        <th class="actions"></th>
                    </tr>
                    <thead>
                    <tbody>
                    <?php foreach ($user['Capture'] as $capture): ?>
                        <tr>
                            <td><?php echo $capture['name']; ?></td>
                            <td><?php echo $capture['status']; ?></td>
                            <td><?php echo $this->Html->link($capture['User']['username'], array('controller' => 'users', 'action' => 'view', $capture['User']['user_id'])); ?></td>
                            <td><?php echo $this->Html->link($capture['Workflow']['name'], array('controller' => 'workflows', 'action' => 'view', $capture['Workflow']['workflow_id'])); ?></td>
                            <td class="actions">
                                <?php echo $this->Html->link('<span class="glyphicon glyphicon-search"></span>', array('controller' => 'captures', 'action' => 'view', $capture['capture_id']), array('escape' => false)); ?>
                                <?php echo $this->Html->link('<span class="glyphicon el-icon-pencil"></span>', array('controller' => 'captures', 'action' => 'edit', $capture['capture_id']), array('escape' => false)); ?>
                                <?php echo $this->Form->postLink('<span class="glyphicon glyphicon-trash"></span>', array('controller' => 'captures', 'action' => 'delete', $capture['capture_id']), array('escape' => false), __('Are you sure you want to delete # %s?', $capture['capture_id'])); ?>
                            </td>
                        </tr>
                    <?php endforeach; ?>
                    </tbody>
                </table>
                <div class="panel-footer"></div>
            </div>
        <?php endif; ?>

        <div class="actions">
            <?php echo $this->Html->link('<span class="glyphicon glyphicon-plus"></span>' . __('New Capture'), array('controller' => 'captures', 'action' => 'add'), array('escape' => false, 'class' => 'btn btn-primary pull-right')); ?>                </div>
    </div>
    <!-- end col md 12 -->
</div>

<hr/>

<div class="related row">
    <div class="col-md-12">
        <h3><?php echo __('Related Lectures'); ?></h3>
        <?php if (!empty($user['Lecture'])): ?>                 <div class="panel panel-primary">
                <!-- Default panel contents -->

                <table cellpadding="0" cellspacing="0" class="table table-striped table-responsive">
                    <thead class="panel-heading">
                    <tr>
                        <th><?php echo __('Number'); ?></th>
                        <th><?php echo __('Name'); ?></th>
                        <th><?php echo __('Semester'); ?></th>
                        <th><?php echo __('Link'); ?></th>
                        <th><?php echo __('User'); ?></th>
                        <th><?php echo __('Type'); ?></th>
                        <th class="actions"></th>
                    </tr>
                    <thead>
                    <tbody>
                    <?php foreach ($user['Lecture'] as $lecture): ?>
                        <tr>
                            <td><?php echo $lecture['number']; ?></td>
                            <td><?php echo $lecture['name']; ?></td>
                            <td><?php echo $lecture['semester']; ?></td>
                            <td>
                                <?php if (!empty($lecture['link'])) echo $this->Html->link(
                                    $this->Html->tag('span', '', array('class' => 'glyphicon glyphicon-link')),
                                    h($lecture['link']), array('full_base' => true, 'escape' => false));
                                ?>
                            </td>
                            <td>
                                <?php echo $this->Html->link($lecture['User']['username'], array('controller' => 'users', 'action' => 'view', $lecture['User']['user_id'])); ?>
                            </td>
                            <td>
                                <?php echo $this->Form->create('EventTypes', array('url' => array('controller' => 'eventTypes', 'action' => 'view', $lecture['EventType']['event_type_id'])));?>

                                <button type="submit" title="<?php echo $lecture['EventType']['name']; ?>"
                                        class="btn-color eventColor<?php echo $lecture['EventType']['color']; ?>"></button>

                                <?php echo $this->Form->end() ?>
                            </td>
                            <td class="actions">
                                <?php echo $this->Html->link('<span class="glyphicon glyphicon-search"></span>', array('controller' => 'lectures', 'action' => 'view', $lecture['lecture_id']), array('escape' => false)); ?>
                                <?php echo $this->Html->link('<span class="glyphicon el-icon-pencil"></span>', array('controller' => 'lectures', 'action' => 'edit', $lecture['lecture_id']), array('escape' => false)); ?>
                                <?php echo $this->Form->postLink('<span class="glyphicon glyphicon-trash"></span>', array('controller' => 'lectures', 'action' => 'delete', $lecture['lecture_id']), array('escape' => false), __('Are you sure you want to delete # %s?', $lecture['lecture_id'])); ?>
                            </td>
                        </tr>
                    <?php endforeach; ?>
                    </tbody>
                </table>

                <div class="panel-footer"></div>
            </div>
        <?php endif; ?>

        <div class="actions">
            <?php echo $this->Html->link('<span class="glyphicon glyphicon-plus"></span>' . __('New Lecture'), array('controller' => 'lectures', 'action' => 'add'), array('escape' => false, 'class' => 'btn btn-primary pull-right')); ?>                </div>
    </div>
    <!-- end col md 12 -->
</div>

<hr/>


<div class="related row">
    <div class="col-md-12">
        <h3><?php echo __('Related Tickets'); ?></h3>
        <?php if (!empty($user['Ticket'])): ?>                 <div class="panel panel-primary">
                <!-- Default panel contents -->

                <table cellpadding="0" cellspacing="0" class="table table-striped table-responsive">
                    <thead class="panel-heading">
                    <tr>
                        <th><?php echo __('Ticket Id'); ?></th>
                        <th><?php echo __('Status'); ?></th>
                        <th><?php echo __('Comment'); ?></th>
                        <th><?php echo __('Created'); ?></th>
                        <th><?php echo __('Modified'); ?></th>
                        <th><?php echo __('Ended'); ?></th>
                        <th><?php echo __('User Id'); ?></th>
                        <th><?php echo __('Task Id'); ?></th>
                        <th><?php echo __('Event Id'); ?></th>
                        <th class="actions"></th>
                    </tr>
                    <thead>
                    <tbody>
                    <?php foreach ($user['Ticket'] as $ticket): ?>
                        <tr>
                            <td><?php echo $ticket['ticket_id']; ?></td>
                            <td><?php echo $ticket['status']; ?></td>
                            <td><?php echo $ticket['comment']; ?></td>
                            <td><?php echo $ticket['created']; ?></td>
                            <td><?php echo $ticket['modified']; ?></td>
                            <td><?php echo $ticket['ended']; ?></td>
                            <td><?php echo $ticket['user_id']; ?></td>
                            <td><?php echo $ticket['task_id']; ?></td>
                            <td><?php echo $ticket['event_id']; ?></td>
                            <td class="actions">
                                <?php echo $this->Html->link('<span class="glyphicon glyphicon-search"></span>', array('controller' => 'tickets', 'action' => 'view', $ticket['ticket_id']), array('escape' => false)); ?>
                                <?php echo $this->Html->link('<span class="glyphicon el-icon-pencil"></span>', array('controller' => 'tickets', 'action' => 'edit', $ticket['ticket_id']), array('escape' => false)); ?>
                                <?php echo $this->Form->postLink('<span class="glyphicon glyphicon-trash"></span>', array('controller' => 'tickets', 'action' => 'delete', $ticket['ticket_id']), array('escape' => false), __('Are you sure you want to delete # %s?', $ticket['ticket_id'])); ?>
                            </td>
                        </tr>
                    <?php endforeach; ?>
                    </tbody>
                </table>

                <div class="panel-footer"></div>
            </div>
        <?php endif; ?>

        <div class="actions">
            <?php echo $this->Html->link('<span class="glyphicon glyphicon-plus"></span>' . __('New Ticket'), array('controller' => 'tickets', 'action' => 'add'), array('escape' => false, 'class' => 'btn btn-primary pull-right')); ?>                </div>
    </div>
    <!-- end col md 12 -->
</div>


</div>
<!-- end col md 9 -->

<div class="col-md-3 column">
    <div class="actions">
        <div class="panel panel-default">
            <div class="panel-heading">
                <h3 class="panel-title">
                    <span class="glyphicon glyphicon-link"></span><?php echo __('Related Actions');?>
                </h3>
            </div>
            <div class="panel-body">
                <ul class="nav nav-pills nav-stacked">
                    <li><?php echo $this->Html->link('<span class="glyphicon el-icon-pencil"></span>' . __('Edit User'), array('action' => 'edit', $user['User']['user_id']), array('escape' => false)); ?> </li>
                    <li><?php echo $this->Form->postLink('<span class="glyphicon glyphicon-trash"></span>' . '<span class="remove-text">' . __('Delete User') . '</span>', array('action' => 'delete', $user['User']['user_id']), array('escape' => false), __('Are you sure you want to delete # %s?', $user['User']['user_id'])); ?> </li>
                    <li><?php echo $this->Html->link('<span class="glyphicon glyphicon-list"></span>' . __('List Users'), array('action' => 'index'), array('escape' => false)); ?> </li>
                    <li><?php echo $this->Html->link('<span class="glyphicon glyphicon-plus"></span>' . __('New User'), array('action' => 'add'), array('escape' => false)); ?> </li>
                </ul>
            </div>
            <div class="panel-heading">
                <? echo __('Groups') ?>
            </div>
            <div class="panel-body">
                <ul class="nav nav-pills nav-stacked">
                    <li><?php echo $this->Html->link('<span class="glyphicon glyphicon-list"></span>' . __('List Groups'), array('controller' => 'groups', 'action' => 'index'), array('escape' => false)); ?> </li>
                    <li><?php echo $this->Html->link('<span class="glyphicon glyphicon-plus"></span>' . __('New Group'), array('controller' => 'groups', 'action' => 'add'), array('escape' => false)); ?> </li>
                </ul>
            </div>
            <div class="panel-heading">
                <? echo __('Tickets') ?>
            </div>
            <div class="panel-body">
                <ul class="nav nav-pills nav-stacked">
                    <li><?php echo $this->Html->link('<span class="glyphicon glyphicon-list"></span>' . __('List Tickets'), array('controller' => 'tickets', 'action' => 'index'), array('escape' => false)); ?> </li>
                    <li><?php echo $this->Html->link('<span class="glyphicon glyphicon-plus"></span>' . __('New Ticket'), array('controller' => 'tickets', 'action' => 'add'), array('escape' => false)); ?> </li>
                </ul>
            </div>
            <!-- end body -->
        </div>
        <!-- end panel -->
    </div>
    <!-- end actions -->

    <?php if (isset($sideCalendar) && $sideCalendar) echo $this->Element('sideCalendar');?>    <?php if (isset($sideTickets) && $sideTickets) echo $this->Element('sideTickets');?>
</div>
<!-- end col md 3 -->

<!--</div>-->
<!--</div>-->