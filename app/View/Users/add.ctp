<div class="users form">

    <div class="row">
        <div class="col-md-12">
            <div class="page-header">
                <h1><?php echo __('Add User'); ?></h1>
            </div>
        </div>
    </div>


    <div class="row">
        <div class="col-md-3">
            <div class="actions">
                <div class="panel panel-default">
                    <div class="panel-heading">Actions</div>
                    <div class="panel-body">
                        <ul class="nav nav-pills nav-stacked">

                            <li><?php echo $this->Html->link(__('<span class="glyphicon glyphicon-list"></span>&nbsp;&nbsp;List Users'), array('action' => 'index'), array('escape' => false)); ?></li>
                            <li><?php echo $this->Html->link(__('<span class="glyphicon glyphicon-list"></span>&nbsp;&nbsp;List Groups'), array('controller' => 'groups', 'action' => 'index'), array('escape' => false)); ?> </li>
                            <li><?php echo $this->Html->link(__('<span class="glyphicon glyphicon-plus"></span>&nbsp;&nbsp;New Group'), array('controller' => 'groups', 'action' => 'add'), array('escape' => false)); ?> </li>
                            <li><?php echo $this->Html->link(__('<span class="glyphicon glyphicon-list"></span>&nbsp;&nbsp;List Captures'), array('controller' => 'captures', 'action' => 'index'), array('escape' => false)); ?> </li>
                            <li><?php echo $this->Html->link(__('<span class="glyphicon glyphicon-plus"></span>&nbsp;&nbsp;New Capture'), array('controller' => 'captures', 'action' => 'add'), array('escape' => false)); ?> </li>
                            <li><?php echo $this->Html->link(__('<span class="glyphicon glyphicon-list"></span>&nbsp;&nbsp;List Lectures'), array('controller' => 'lectures', 'action' => 'index'), array('escape' => false)); ?> </li>
                            <li><?php echo $this->Html->link(__('<span class="glyphicon glyphicon-plus"></span>&nbsp;&nbsp;New Lecture'), array('controller' => 'lectures', 'action' => 'add'), array('escape' => false)); ?> </li>
                            <li><?php echo $this->Html->link(__('<span class="glyphicon glyphicon-list"></span>&nbsp;&nbsp;List Tickets'), array('controller' => 'tickets', 'action' => 'index'), array('escape' => false)); ?> </li>
                            <li><?php echo $this->Html->link(__('<span class="glyphicon glyphicon-plus"></span>&nbsp;&nbsp;New Ticket'), array('controller' => 'tickets', 'action' => 'add'), array('escape' => false)); ?> </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <!-- end col md 3 -->
        <div class="col-md-9">
            <?php echo $this->Form->create('User', array('role' => 'form',
                'inputDefaults' => array(
                    'div' => 'form-group',
                    'label' => array(
                        'class' => 'col col-md-3 control-label'
                    ),
                    'wrapInput' => 'col col-md-6',
                    'class' => 'form-control'
                ),
                'class' => 'well form-horizontal'
            )); ?>

            <div class="form-group">
                <?php echo $this->Form->input('username', array('label' => array('text' => 'Username',
                    'class' => 'col col-md-3 control-label'), 'placeholder' => 'Username'));?>
            </div>
            <div class="form-group">
                <?php echo $this->Form->input('pwd', array(
                    'label' => 'Enter Password', 'type' => 'password', 'label' => array('text' => 'Password',
                        'class' => 'col col-md-3 control-label'), 'placeholder' => 'Repeat password',
                    'value' => '',
                    'autocomplete' => 'off'));?>
            </div>
            <div class="form-group">
                <?php echo $this->Form->input('pwd_confirm', array(
                    'label' => 'Confirm Password', 'type' => 'password', 'label' => array('text' => 'Password confirmation',
                        'class' => 'col col-md-3 control-label'), 'placeholder' => 'Repeat password',
                    'value' => '',
                    'autocomplete' => 'off'));?>
            </div>
            <div class="form-group">
                <?php echo $this->Form->input('email', array('label' => array('text' => 'E-Mail',
                    'class' => 'col col-md-3 control-label'), 'placeholder' => 'Email'));?>
            </div>
            <div class="form-group">
                <?php echo $this->Form->input('User.language', array(
                    'label' => array('text' => 'Language',
                        'class' => 'col col-md-3 control-label'),
                    'options' => array(array('name' => 'German', 'value' => 'deu'), array('name' => 'English', 'value' => 'eng')),
                    'selected' => 1,
                ));?>
            </div>
            <div class="form-group">
                <?php echo $this->Form->input('group_id', array('label' => array('text' => 'User group',
                    'class' => 'col col-md-3 control-label'), 'placeholder' => 'Group Id', 'selected' => 3));?>
            </div>


            <div class="form-group">
                <?php echo $this->Form->submit(__('Submit'), array(
                    'div' => 'col col-md-6 col-md-offset-3',
                    'class' => 'btn btn-primary'
                )); ?>
            </div>

            <div class="form-group">
                <?php echo $this->Form->end() ?>
            </div>

        </div>
        <!-- end col md 12 -->
    </div>
    <!-- end row -->
</div>
