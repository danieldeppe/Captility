<div class="col-md-1 column">
    <!-- Element::LeftTabs -->

    <div class="clearfix">
        <div class="tabbable tabs-left">
            <ul class="nav nav-tabs">
                <li class="active"><a href="#a" data-toggle="tab">Woche</a></li>
                <li><a href="#b" data-toggle="tab">Tickets</a></li>
                <li><a href="#c" data-toggle="tab">Produktion</a></li>
            </ul>
        </div>
    </div>

    <!-- End::LeftTabs -->
</div>

<div class="col-md-8 column content-pane">
    <?php echo $this->Session->flash(); ?>

    <div class="tab-content">
        <div class="tab-pane active" id="a">
            <? // Tab Content #a ?>
            <div class="Calendar index">
                <div id="calendar"></div>
            </div>
        </div>



        <div class="tab-pane" id="b">
            <?php echo $this->Element('tabContentDummy');?>
            <? // Tab Content #b ?>
        </div>


        <? // Tab Content #c ?>

        <div class="tab-pane" id="c">

        </div>
    </div>
</div>