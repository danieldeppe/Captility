
<? $this->Breadcrumbs->addCrumb(__('Team'), '/production'); ?>
<? $this->Breadcrumbs->addCrumb('<span class="glyphicon el-icon-random"></span>'.__('Workflows'),array('action' => 'index')); ?><?php $this->Breadcrumbs->addCrumb(__('Admin Add Workflow'), '#', array('class' => 'active')); ?>
<!--<div class=" form">-->

<div class="row">
    <div class="col-md-1 column">
     <div class="glyphicon-headline hidden-sm hidden-xs"><span class="glyphicon el-icon-random"></span></div>
    </div>
    <div class="col-md-11 column">
        <div class="page-header">
            <h1><?php echo __('Admin Add Workflow'); ?></h1>
        </div>
    </div>
</div>


<!--<div class="row">-->

<div class="col-md-1 column">
</div>
<div class="col-md-8 column">

    <?php echo $this->Session->flash(); ?>    <?php echo $this->Session->flash('auth'); ?>
    			<?php echo $this->Form->create('Workflow', array('role' => 'form')); ?>

    				<div class="form-group">
					<?php echo $this->Form->input('name', array('class' => 'form-control', 'placeholder' => 'Name'));?>
				</div>
    				<?php echo $this->Element('submitArea');?>

			<?php echo $this->Form->end() ?>

</div><!-- end col md 12 -->


<div class="col-md-3 column">
    <div class="actions">
        <div class="panel panel-default">
            <div class="panel-heading">
                <h3 class="panel-title">
                    <span class="glyphicon glyphicon-link"></span><?php echo __('Related Actions');?>                </h3>
            </div>
            <div class="panel-body">
                <ul class="nav nav-pills nav-stacked">

                                        <li><?php echo $this->Html->link('<span class="glyphicon glyphicon-list"></span>'.__('List Workflows'), array('action' => 'index'), array('escape' => false)); ?></li>
                    		<li><?php echo $this->Html->link('<span class="glyphicon glyphicon-list"></span>'.__('List Captures'), array('controller' => 'captures', 'action' => 'index'), array('escape' => false)); ?> </li>
		<li><?php echo $this->Html->link('<span class="glyphicon glyphicon-plus"></span>'.__('New Capture'), array('controller' => 'captures', 'action' => 'add'), array('escape' => false)); ?> </li>
		<li><?php echo $this->Html->link('<span class="glyphicon glyphicon-list"></span>'.__('List Tasks'), array('controller' => 'tasks', 'action' => 'index'), array('escape' => false)); ?> </li>
		<li><?php echo $this->Html->link('<span class="glyphicon glyphicon-plus"></span>'.__('New Task'), array('controller' => 'tasks', 'action' => 'add'), array('escape' => false)); ?> </li>
                </ul>
            </div>
        </div>
    </div>


    <?php if (isset($sideCalendar) && $sideCalendar) echo $this->Element('sideCalendar');?>    <?php if (isset($sideTickets) && $sideTickets) echo $this->Element('sideTickets');?>
</div><!-- end col md 3 -->


<!--</div>--><!-- end row -->
<!--</div>-->
