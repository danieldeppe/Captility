/**
 * @author Daniel Deppe
 */

//######################################################################################################################
//############################################### GENERAL ##############################################################
//######################################################################################################################
/**
 * Variables & Utilities;
 */
$mobileMaxWidth = 992;

function getParameterByName(name, href) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(href);
    if (results == null)
        return "";
    else
        return decodeURIComponent(results[1].replace(/\+/g, " "));
}


//######################################################################################################################
//############################################ RESPONSIVENESS ##########################################################
//######################################################################################################################

/*var thisScreenWidth = 0, thisScreenHeight = 0;
 function viewScreenSize() {
 if (typeof (window.innerWidth) === 'number') {
 //Non-IE
 thisScreenWidth = window.innerWidth;
 thisScreenHeight = window.innerHeight;
 } else if (document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight)) {
 //IE 6+ in 'standards compliant mode'
 thisScreenWidth = document.documentElement.clientWidth;
 thisScreenHeight = document.documentElement.clientHeight;
 } else if (document.body && (document.body.clientWidth || document.body.clientHeight)) {
 //IE 4 compatible
 thisScreenWidth = document.body.clientWidth;
 thisScreenHeight = document.body.clientHeight;
 screenWidth = thisScreenWidth;
 }
 // screenSize = div in page footer
 $("#screenSize").html(thisScreenWidth + "x" + thisScreenHeight);
 }*/


//######################################################################################################################
//############################################ SIDE CALENDAR ###########################################################
//######################################################################################################################
/**
 * German translation for bootstrap-datepicker
 * Sam Zurcher <sam@orelias.ch>
 */
;
(function ($) {
    $.fn.datepicker.dates['de'] = {
        days: ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag"],
        daysMin: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"],
        daysShort: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"],
        months: ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"],
        monthsShort: ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"],
        today: "Heute",
        weekStart: 1,
        format: "D, dd.mm.yyyy"
    };
}(jQuery));

// ######################################## INIT DATEPICKER ############################################################
/**
 * Activate SideCalendar inline in Right Column.
 */
$(document).ready(function () {

        $('#SideCalendar').datepicker({
            format: "dd/mm/yyyy",
            weekStart: 1,
            todayBtn: true,
            language: "de",
            orientation: "top center",
            daysOfWeekDisabled: "0,6",
            calendarWeeks: true,
            todayHighlight: true,
            selectWeek: true,
            autoclose: true,
            todayBtn: true // Today selects current day instead of just showing (true)
        }, function () {


        });

        $('.pickDate').datepicker({

            weekStart: 1,
            language: "de",
            todayHighlight: true,
            autoclose: true,
            orientation: "top center",
            todayBtn: "linked"
        }, function () {


        });

        // Combine Datepicker and FullCalendar (inkl. Today-Button
        $('#SideCalendar').datepicker()
// when Datepicker is clicked...
            .on('changeDate', function (e) {

                //if FullCalendar present
                if ($('#calendar').length) {
                    // ... jump in FullCalendar
                    console.log('Datepicker: ' + e.date);
                    $('#calendar').fullCalendar('gotoDate', new Date(e.date));
                }
                // else: Load Calendar View
                else {

                    window.location.href = "/captility/calendars/?date=" + e.date;

                }


            }
        );


        /*$('.datepicker-days tbody tr').on('mouseleave', function(){

         $(this).removeClass('weekHighlight');
         });*/

    }
);


//######################################################################################################################
//############################################ FULL CALENDAR ###########################################################
//######################################################################################################################


/**
 * Activate FullCalendar
 */
$(document).ready(function () {


    // ######################################### INIT QTIPS2  ##########################################################

    //Tooltips qtip2
    var tooltip = $('<div/>').qtip({
        id: 'calendar',
        prerender: true,
        content: {
            text: ' ',
            title: {
                button: true
            }
        },
        position: {
            my: 'top center',
            at: ' center',
            target: 'mouse',
            viewport: $('#calendar'),
            adjust: {
                mouse: false,
                scroll: false
            }
        },
        show: false,
        hide: {
            event: 'unfocus click mouseleave'
        },
        style: 'qtip-bootstrap'
    }).qtip('api');

    // ##################################### CALENDAR SETTINGS  ########################################################

    // ##################################### Responsive Calendar  ######################################################
    // Check if full Calendar or small View is needed:

    //Header for Week/Start/ Production (Landing page)
    $mediaQueryHeader = {
        left: 'title',
        center: '',
        right: 'prev,today,next'
    };
    $mediaQueryView = 'agendaWeek';
    $hiddenDays = [ 0, 6 ];

    // Header for Calendar (big version)
    if ((window.location.href.indexOf("calendar") > -1) || (window.location.href.indexOf("full_calendar") > -1)) { // Todo Entferne FullCalendar
        $mediaQueryHeader.left = 'agendaDay,agendaWeek,month';
        $mediaQueryHeader.center = 'title';
        $mediaQueryHeader.right = 'prev,today,next';
        $mediaQueryView = 'month';
        $hiddenDays = [ 0 ];
    }

    //Initial Start View
    if ($(document).width() < $mobileMaxWidth) {
        $mediaQueryView = 'agendaDay';
    }

    // Later changes on resize
    $(window).bind('resize', function () {
        if ($(document).width() < $mobileMaxWidth) $('#calendar').fullCalendar('changeView', 'agendaDay');
        else $('#calendar').fullCalendar('changeView', 'agendaWeek');
    });

    //Event Sources
    var captilityEventSources = {

        overview: {
            url: 'events/feed',
            type: 'GET',
            cache: false
            /*,error: function () {
             alert('Generelle Events konnten nicht geladen werden.');
             }*/
        },
        myweek: {
            url: 'events/feedMy',
            type: 'GET',
            cache: false
            /*,error: function () {
             alert('Eigene Events konnten nicht geladen werden.');
             }*/
        }
    };

    // ##################################### Combine Calendar with Tabs ################################################

    $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
        $('#calendar').fullCalendar('render');
        $('#calendar').fullCalendar('render');
    });


    // Swich Event-Sources
    $('#GeneralViewFc').click(function () {

        //$('.datepicker').datepicker('update', new Date($('#SideCalendar').datepicker('getDate')));

        if (!$(this).parent().hasClass("active")) {

            $('#calendar').fullCalendar('removeEventSource', captilityEventSources.myweek)
                .fullCalendar('removeEventSource', captilityEventSources.overview)
                .fullCalendar('addEventSource', captilityEventSources.overview);

        }

    });

    $('#MyWeekViewFc').click(function () {

        //$('.datepicker').datepicker('update', new Date($('#SideCalendar').datepicker('getDate')));

        if (!$(this).parent().hasClass("active")) {
            $('#calendar').fullCalendar('removeEventSource', captilityEventSources.overview)
                .fullCalendar('removeEventSource', captilityEventSources.myweek)
                .fullCalendar('addEventSource', captilityEventSources.myweek);
        }

    });

    // ######################################## INIT CALENDAR ##########################################################

    var calendar = $('#calendar').fullCalendar({

        //View
        header: $mediaQueryHeader,
        defaultView: $mediaQueryView,
        weekMode: 'variable',
        allDaySlot: false, // Show allday-slot
        weekends: true, // Show Weekends
        firstDay: 1, //0 = So, 1 = Mo...
        hiddenDays: $hiddenDays, // No So
        aspectRatio: 1.26, //1.375, //Dimension of Calendar

        //TimeFormat - German
        firstHour: 8,
        minTime: 6,
        maxTime: 22,
        axisFormat: 'HH:mm',
        formatDate: 'dd.MM.yyyy HH:mm:ss',
        titleFormat: {
            month: 'MMMM yyyy',     // September 2009
            week: "dd.[ MMM.][yy]{ '&#8211;' dd. MMMM yyyy}", // Sep 7 - 13 2009
            day: 'dddd, dd.MM.yyyy'// Tuesday, Sep 8, 2009
        },
        columnFormat: {
            month: 'ddd',    // Mon
            week: "ddd - d.M.", // Mon 9/7
            day: 'dddd d.M.'  // Monday 9/7
        },
        timeFormat: "HH:mm{ – HH:mm}' Uhr'", // Determines the time-text that will be displayed on each event.


        //German
        monthNames: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli',
            'August', 'September', 'Oktober', 'November', 'Dezember'],
        monthNamesShort: ['Jan', 'Feb', 'Mrz', 'Apr', 'Mai', 'Jun', 'Jul',
            'Aug', 'Sept', 'Okt', 'Nov', 'Dez'],
        dayNames: ["Sonntag", "Montag", "Dienstag", "Mittwoch",
            "Donnerstag", "Freitag", "Samstag"],
        dayNamesShort: ["So", "Mo", "Di", "Mi",
            "Do", "Fr", "Sa"],
        allDayText: 'Ganztägig',
        buttonText: {
            today: 'Heute',
            month: 'Monat',
            week: 'Woche',
            day: 'Tag'
        },

        //Events
        eventSources: [captilityEventSources.overview],

        //Interaction
        editable: true,
        selectable: true,

        // ######################################## Sync Datepicker ####################################################
        viewRender: function (view, element) {
            console.log('FullCalendar: ' + view.start);
            $('#SideCalendar').datepicker('update', new Date(view.start));
        },

        eventClick: function (data, event, view) {
            var content = '<p><b>Start:</b> ' + data.start + '<br />' +
                (data.end && '<p><b>End:</b> ' + data.end + '</p>' || '') +
                '<a class="btn-m btn-sm btn-default pull-right" name="Bearbeiten" href="captures/edit/' + data.capture_id + '">Bearbeiten</a>' +
                '<a class="btn-m btn-sm btn-default pull-right" name="Anzeigen" href="captures/view/' + data.capture_id + '">Anzeigen</a>';

            tooltip.set({
                'content.text': content,
                'content.title': data.title,
                'style.classes': 'qtip-bootstrap ' + 'qtip-' + data.className
            })
                .reposition(event).show(event);
        },

        // ######################################## Event Interaction ##################################################
        eventResizeStart: function () {
            tooltip.hide()
        },
        eventDragStart: function () {
            tooltip.hide()
        },
        viewDisplay: function () {
            tooltip.hide()
        },

        eventDrop: function (event) {
            var startdate = new Date(event.start);
            var startyear = startdate.getFullYear();
            var startday = startdate.getDate();
            var startmonth = startdate.getMonth() + 1;
            var starthour = startdate.getHours();
            var startminute = startdate.getMinutes();
            var enddate = new Date(event.end);
            var endyear = enddate.getFullYear();
            var endday = enddate.getDate();
            var endmonth = enddate.getMonth() + 1;
            var endhour = enddate.getHours();
            var endminute = enddate.getMinutes();
            if (event.allDay == true) {
                var allday = 1;
            } else {
                var allday = 0;
            }
            var url = "events/update?id=" + event.id + "&start=" + startyear + "-" + startmonth + "-" + startday + " " + starthour + ":" + startminute + ":00&end=" + endyear + "-" + endmonth + "-" + endday + " " + endhour + ":" + endminute + ":00&allday=" + allday;
            $.post(url, function (data) {
            });
        },
        eventResize: function (event) {
            var startdate = new Date(event.start);
            var startyear = startdate.getFullYear();
            var startday = startdate.getDate();
            var startmonth = startdate.getMonth() + 1;
            var starthour = startdate.getHours();
            var startminute = startdate.getMinutes();
            var enddate = new Date(event.end);
            var endyear = enddate.getFullYear();
            var endday = enddate.getDate();
            var endmonth = enddate.getMonth() + 1;
            var endhour = enddate.getHours();
            var endminute = enddate.getMinutes();
            var url = "events/update?id=" + event.id + "&start=" + startyear + "-" + startmonth + "-" + startday + " " + starthour + ":" + startminute + ":00&end=" + endyear + "-" + endmonth + "-" + endday + " " + endhour + ":" + endminute + ":00";
            $.post(url, function (data) {
            });
        }

        /*selectHelper: true,
         , select: function(start, end, allDay) {
         var title = prompt('Event Title:');
         if (title) {
         calendar.fullCalendar('renderEvent',
         {
         title: title,
         start: start,
         end: end,
         allDay: allDay,
         className: 'eventColorBlack'
         },
         true // make the event "stick"
         );
         }
         calendar.fullCalendar('unselect');
         }*/

    });
    // ######################################## Load StartView #########################################################

    // Start view from selected date if set as GET param
    if ($('#calendar').length) {


        var param = getParameterByName('date', window.location.href);
        if (param) {

            $('#calendar').fullCalendar('gotoDate', new Date(param));
            console.log('Query: ' + getParameterByName('date', window.location.href));
        }

    }
    ;


});

//######################################################################################################################
//############################################ FULL CALENDAR ###########################################################
//######################################################################################################################


var eventColorValues = {
    colors: [
        ['#202020', '#3a87ad', '#f70', '#009406', '#FFEB00', '#FD3E20', '#5F43A8', '#009B9B', '#579B00', '#FF38D7', '#FDFDFD']
    ]
};

var eventColorNames = ['Black', 'Blue', 'Orange', 'Green' , 'Yellow', 'Red', 'Purple', 'Indigo', 'Mint', 'Pink', 'White']
/*var eventColorNames = ['Black','Blue','Orange', 'Green' , 'Yellow','Red','Purple','Indigo', 'Mint', 'Pink','White']*/

$(document).ready(function () {


    $('.colorpalette').colorPalette(eventColorValues)
        .on('selectColor', function (e) {
            $('.selected-color').val(e.color);
        });


//######################################################################################################################
//############################################# TABBED FORMS  ##########################################################
//######################################################################################################################

    // ADD SCHEDULE BUTTONS
    (function ($) {
        $.fn.updateScheduleRemoveState = function () {

            var $buttons = $('#ScheduleContainer button.form-schedule-remove');

            if ($buttons.length > 1) {

                $buttons.prop('disabled', false);
            } else {

                $buttons.prop('disabled', true);
            }

            return true;
        };
    })(jQuery);

    // TOGGLE ACTIVE TABS OF FORM
    $('#ScheduleContainer').on('click', 'a.form-toggle', function () {

        var $target = $($(this).attr('href'));

        $target.parent().find('input, select').prop('disabled', true);
        $target.find('input, select').prop('disabled', false);
    });


    // ADD SCHEDULES TO FORM
    $('#ScheduleContainer').on('click', 'button.form-schedule-add', function () {

        var $i = $('#ScheduleContainer .panel').length;


        var $schedulesBoxText = '<div class="panel panel-default"> <div class="panel-heading panel-link" data-toggle="collapse" href="#container' + $i + '"> <small class="glyphicon glyphicon-time"></small> <strong>Aufnahmezeit einstellen</strong></div> <div class="panel-body" id="container' + $i + '"> <ul class="nav nav-tabs nav-justified tabs-left"> <li class="active"><a href="#single' + $i + '" class="form-toggle" data-toggle="tab">Einzelaufzeichnung</a> </li> <li><a href="#regular' + $i + '" class="form-toggle" data-toggle="tab">Regelmäßige Aufzeichnung</a></li> <li class="disabled"><a href="#except' + $i + '" class="form-toggle" data-toggle="tab">Ausnahmeregel</a> </li> </ul> <!-- Single Instance Schedule --> <div class="tab-content"> <div class="tab-pane active" id="single' + $i + '"><!--<div class="form-group"></div>--> <div class="form-group"><label for="Schedule' + $i + 'IntervalStart" class="control-label">Datum der Aufzeichnung</label> <div class="input-group input-thin"><span  class="input-group-addon glyphicon glyphicon-calendar input-group-glyphicon"></span> <div class="input string required"><input name="data[Schedule][' + $i + '][interval_start]"    class="form-control pickDate"    placeholder="Datum der Aufzeichnung" type="string"    id="Schedule' + $i + 'IntervalStart"></div> </div> </div> <div class="form-group"> <div class="required"><label  for="Schedule' + $i + 'RepeatTimeHour">Veranstaltungsbeginn(Uhrzeit)</label> <div class="input time required"><select name="data[Schedule][' + $i + '][repeat_time][hour]"    class="form-control form-control-date"    id="Schedule' + $i + 'RepeatTimeHour">  <option value="00">00</option>  <option value="01">1</option>  <option value="03">3</option>  <option value="04">4</option>  <option value="05">5</option>  <option value="06">6</option>  <option value="07">7</option>  <option value="08">8</option>  <option value="09">9</option>  <option value="10">10</option>  <option value="11">11</option>  <option value="12" selected="selected">12</option>  <option value="13">13</option>  <option value="14">14</option>  <option value="15">15</option>  <option value="16">16</option>  <option value="17">17</option>  <option value="18">18</option>  <option value="19">19</option>  <option value="20">20</option>  <option value="21">21</option>  <option value="22">22</option>  <option value="23">23</option> </select>:<select name="data[Schedule][' + $i + '][repeat_time][min]"  class="form-control form-control-date" id="Schedule' + $i + 'RepeatTimeMin">  <option value="00" selected="selected">00</option>  <option value="15">15</option>  <option value="30">30</option>  <option value="45">45</option> </select></div> </div> </div> <div class="form-group"> <div class="required"><label for="Schedule' + $i + 'DurationHour">Dauer der Aufzeichnung</label> <div class="input time required"><select name="data[Schedule][' + $i + '][duration][hour]"    class="form-control form-control-date"    id="Schedule' + $i + 'DurationHour"    required="required">  <option value="00">' + $i + '</option>  <option value="01">1</option>  <option value="02" selected="selected">2</option>  <option value="03">3</option>  <option value="04">4</option>  <option value="05">5</option>  <option value="06">6</option>  <option value="07">7</option>  <option value="08">8</option>  <option value="09">9</option>  <option value="10">10</option>  <option value="11">11</option>  <option value="12">12</option>  <option value="13">13</option>  <option value="14">14</option>  <option value="15">15</option>  <option value="16">16</option>  <option value="17">17</option>  <option value="18">18</option>  <option value="19">19</option>  <option value="20">20</option>  <option value="21">21</option>  <option value="22">22</option>  <option value="23">23</option> </select>:<select name="data[Schedule][' + $i + '][duration][min]"  class="form-control form-control-date" id="Schedule' + $i + 'DurationMin"  required="required">  <option value="00" selected="selected">00</option>  <option value="15">15</option>  <option value="30">30</option>  <option value="45">45</option> </select></div> </div> </div> </div> <!-- Regular Schedule --> <div class="tab-pane" id="regular' + $i + '"> <!--<div class="form-group"></div><div class="form-group"></div>--> <div class="form-group"><label for="Schedule' + $i + 'IntervalStart" class="control-label">Zeitraum der Aufzeichnung</label> <div class="input-group input-thin"><span  class="input-group-addon glyphicon glyphicon-calendar input-group-glyphicon"></span> <div class="input string required"><input name="data[Schedule][' + $i + '][interval_start]"    class="form-control pickDate"    placeholder="Beginn d. Zeitraums" disabled="disabled"    type="string" id="Schedule' + $i + 'IntervalStart"> </div> <span class="input-group-addon">bis</span> <div class="input string required"><input name="data[Schedule][' + $i + '][interval_end]"    class="form-control pickDate"    placeholder="Ende d. Zeitraums" disabled="disabled"    type="string" id="Schedule' + $i + 'IntervalEnd"> </div> </div> </div> <div class="form-group"> <div><label for="Schedule' + $i + 'RepeatWeek">Wöchentlich wiederholen</label> <div class="input select"><select name="data[Schedule][' + $i + '][repeat_week]"   class="form-control"   placeholder="1 = jede Woche wiederholen, 2= jede zweite usw."   disabled="disabled" id="Schedule' + $i + 'RepeatWeek">  <option value="1" selected="selected">Jede Woche</option>  <option value="2">Jede zweite Woche</option>  <option value="3">Jede dritte Woche</option>  <option value="4">Jede vierte Woche</option> </select></div> </div> </div> <div class="form-group"> <div><label for="Schedule' + $i + 'RepeatDay">Wiederholen an Wochentag</label> <div class="input select"><select name="data[Schedule][' + $i + '][repeat_day]"   class="form-control"   placeholder="&quot;Freitag&quot; für jeden Freitag usw..."   disabled="disabled" id="Schedule' + $i + 'RepeatDay">  <option value="Monday">Montag</option>  <option value="Tuesday">Dienstag</option>  <option value="Wednesday">Mittwoch</option>  <option value="Thursday">Donnerstag</option>  <option value="Friday">Freitag</option>  <option value="Saturday" selected="selected">Samstag</option>  <option value="Sunday">Sonntag</option> </select></div> </div> </div> <div class="form-group"> <div class="required"><label  for="Schedule' + $i + 'RepeatTimeHour">Veranstaltungsbeginn(Uhrzeit)</label> <div class="input time required"><select name="data[Schedule][' + $i + '][repeat_time][hour]"    class="form-control form-control-date"    disabled="disabled"    id="Schedule' + $i + 'RepeatTimeHour">  <option value="00">0</option>  <option value="01">1</option>  <option value="02">2</option>  <option value="03">3</option>  <option value="04">4</option>  <option value="05">5</option>  <option value="06">6</option>  <option value="07">7</option>  <option value="08">8</option>  <option value="09">9</option>  <option value="10">10</option>  <option value="11">11</option>  <option value="12" selected="selected">12</option>  <option value="13">13</option>  <option value="14">14</option>  <option value="15">15</option>  <option value="16">16</option>  <option value="17">17</option>  <option value="18">18</option>  <option value="19">19</option>  <option value="20">20</option>  <option value="21">21</option>  <option value="22">22</option>  <option value="23">23</option> </select>:<select name="data[Schedule][' + $i + '][repeat_time][min]"  class="form-control form-control-date" disabled="disabled"  id="Schedule' + $i + 'RepeatTimeMin">  <option value="00" selected="selected">00</option>  <option value="15">15</option>  <option value="3' + $i + '">3' + $i + '</option>  <option value="45">45</option> </select></div> </div> </div> <div class="form-group"> <div class="required"><label for="Schedule' + $i + 'DurationHour">Dauer (Stunden)</label> <div class="input time required"><select name="data[Schedule][' + $i + '][duration][hour]"    class="form-control form-control-date"    disabled="disabled"    id="Schedule' + $i + 'DurationHour">  <option value="00">0</option>  <option value="01">1</option>  <option value="02" selected="selected">2</option>  <option value="03">3</option>  <option value="04">4</option>  <option value="05">5</option>  <option value="06">6</option>  <option value="07">7</option>  <option value="08">8</option>  <option value="09">9</option>  <option value="10">10</option>  <option value="11">11</option>  <option value="12">12</option>  <option value="13">13</option>  <option value="14">14</option>  <option value="15">15</option>  <option value="16">16</option>  <option value="17">17</option>  <option value="18">18</option>  <option value="19">19</option>  <option value="20">20</option>  <option value="21">21</option>  <option value="22">22</option>  <option value="23">23</option> </select>:<select name="data[Schedule][' + $i + '][duration][min]"  class="form-control form-control-date" disabled="disabled"  id="Schedule' + $i + 'DurationMin">  <option value="00" selected="selected">00</option>  <option value="15">15</option>  <option value="30">30</option>  <option value="45">45</option> </select></div> </div> </div> </div> <!-- Exception Schedule --> <div class="tab-pane" id="except' + $i + '"> <div class="alert alert-warning alert-dismissable"> <button type="button" class="close" data-dismiss="alert" aria-hidden="true">?</button> <strong>Achtung!</strong>Ausnahmeregeln werden in der aktuellen Version von Captility noch nicht unterstützt. </div> </div> <hr/> <button class="btn btn-default form-schedule-add pull-right" type="button"><span class="glyphicon glyphicon-plus"></span>Weiterer Zeitplan </button> <button class="btn btn-default form-schedule-remove" type="button" onclick=""><span class="glyphicon glyphicon-remove"></span>Zeitplan entfernen </button> </div> </div> </div>';
                //var $schedulesBoxText = '<div class="panel panel-default"> <div class="panel-heading panel-link" data-toggle="collapse" href="#container' + $i + '">  <small class="glyphicon glyphicon-time"></small>  <strong>Aufnahmezeit einstellen</strong></div> <div class="panel-body" id="container' + $i + '">  <ul class="nav nav-tabs nav-justified tabs-left"><li class="active"><a href="#single' + $i + '" class="form-toggle" data-toggle="tab">Einzelaufzeichnung</a></li><li><a href="#regular' + $i + '" class="form-toggle" data-toggle="tab">Regelmäßige Aufzeichnung</a></li><li class="disabled"><a href="#except' + $i + '" class="form-toggle" data-toggle="tab">Ausnahmeregel</a></li>  </ul>  <!-- Single Instance Schedule -->  <div class="tab-content"><div class="tab-pane active" id="single' + $i + '"><!--<div class="form-group"></div>--> <div class="form-group"><label for="Schedule' + $i + 'IntervalStart" class="control-label">Datum der  Aufzeichnung</label>  <div class="input-group input-thin"><span class="input-group-addon glyphicon glyphicon-calendar input-group-glyphicon"></span><div class="input string required"><input name="data[Schedule][' + $i + '][interval_start]"class="form-control pickDate"placeholder="Datum der Aufzeichnung" type="string"id="Schedule' + $i + 'IntervalStart"></div>  </div> </div> <div class="form-group">  <div class="required"><label for="Schedule' + $i + 'RepeatTimeHour">Veranstaltungsbeginn(Uhrzeit)</label><div class="input time required"><select name="data[Schedule][' + $i + '][repeat_time][hour]"  class="form-control form-control-date"  id="Schedule' + $i + 'RepeatTimeHour"> <option value="00">00</option> <option value="01">1</option> <option value="03">3</option> <option value="04">4</option> <option value="05">5</option> <option value="06">6</option> <option value="07">7</option> <option value="08">8</option> <option value="09">9</option> <option value="10">10</option> <option value="11">11</option> <option value="12" selected="selected">12</option> <option value="13">13</option> <option value="14">14</option> <option value="15">15</option> <option value="16">16</option> <option value="17">17</option> <option value="18">18</option> <option value="19">19</option> <option value="20">20</option> <option value="21">21</option> <option value="22">22</option> <option value="23">23</option></select>:<select name="data[Schedule][' + $i + '][repeat_time][min]"class="form-control form-control-date"id="Schedule' + $i + 'RepeatTimeMin"> <option value="00" selected="selected">00</option> <option value="15">15</option> <option value="30">30</option> <option value="45">45</option></select></div>  </div> </div><div class="form-group">  <div class="required"><label for="Schedule' + $i + 'DurationHour">Dauer der Aufzeichnung</label><div class="input time required"><select name="data[Schedule][' + $i + '][duration][hour]"  class="form-control form-control-date"  id="Schedule' + $i + 'DurationHour"  required="required"> <option value="00">' + $i + '</option> <option value="01">1</option> <option value="02" selected="selected">2</option> <option value="03">3</option> <option value="04">4</option> <option value="05">5</option> <option value="06">6</option> <option value="07">7</option> <option value="08">8</option> <option value="09">9</option> <option value="10">10</option> <option value="11">11</option> <option value="12">12</option> <option value="13">13</option> <option value="14">14</option> <option value="15">15</option> <option value="16">16</option> <option value="17">17</option> <option value="18">18</option> <option value="19">19</option> <option value="20">20</option> <option value="21">21</option> <option value="22">22</option> <option value="23">23</option></select>:<select name="data[Schedule][' + $i + '][duration][min]"class="form-control form-control-date" id="Schedule' + $i + 'DurationMin"required="required"> <option value="00" selected="selected">00</option> <option value="15">15</option> <option value="30">30</option> <option value="45">45</option></select></div>  </div> </div></div><!-- Regular Schedule --><div class="tab-pane" id="regular' + $i + '"> <!--<div class="form-group"></div><div class="form-group"></div>--> <div class="form-group"><label for="Schedule' + $i + 'IntervalStart" class="control-label">Zeitraum der  Aufzeichnung</label>  <div class="input-group input-thin"><span class="input-group-addon glyphicon glyphicon-calendar input-group-glyphicon"></span><div class="input string required"><input name="data[Schedule][' + $i + '][interval_start]"class="form-control pickDate"placeholder="Beginn d. Zeitraums" disabled="disabled"type="string" id="Schedule' + $i + 'IntervalStart"></div><span class="input-group-addon">bis</span><div class="input string required"><input name="data[Schedule][' + $i + '][interval_end]"class="form-control pickDate"placeholder="Ende d. Zeitraums" disabled="disabled"type="string" id="Schedule' + $i + 'IntervalEnd"></div>  </div> </div> <div class="form-group">  <div><label for="Schedule' + $i + 'RepeatDay">Wiederholen an Wochentag</label><div class="input select"><select name="data[Schedule][' + $i + '][repeat_day]" class="form-control" placeholder="&quot;Freitag&quot; für jeden Freitag usw..." disabled="disabled" id="Schedule' + $i + 'RepeatDay"> <option value="Monday">Montag</option> <option value="Tuesday">Dienstag</option> <option value="Wednesday">Mittwoch</option> <option value="Thursday">Donnerstag</option> <option value="Friday">Freitag</option> <option value="Saturday" selected="selected">Samstag</option> <option value="Sunday">Sonntag</option></select></div>  </div> </div> <div class="form-group">  <div class="required"><label for="Schedule' + $i + 'RepeatTimeHour">Veranstaltungsbeginn(Uhrzeit)</label><div class="input time required"><select name="data[Schedule][' + $i + '][repeat_time][hour]"  class="form-control form-control-date"  disabled="disabled"  id="Schedule' + $i + 'RepeatTimeHour"> <option value="00">0</option> <option value="01">1</option> <option value="02">2</option> <option value="03">3</option> <option value="04">4</option> <option value="05">5</option> <option value="06">6</option> <option value="07">7</option> <option value="08">8</option> <option value="09">9</option> <option value="10">10</option> <option value="11">11</option> <option value="12" selected="selected">12</option> <option value="13">13</option> <option value="14">14</option> <option value="15">15</option> <option value="16">16</option> <option value="17">17</option> <option value="18">18</option> <option value="19">19</option> <option value="20">20</option> <option value="21">21</option> <option value="22">22</option> <option value="23">23</option></select>:<select name="data[Schedule][' + $i + '][repeat_time][min]"class="form-control form-control-date" disabled="disabled"id="Schedule' + $i + 'RepeatTimeMin"> <option value="00" selected="selected">00</option> <option value="15">15</option> <option value="3' + $i + '">3' + $i + '</option> <option value="45">45</option></select></div>  </div> </div> <div class="form-group">  <div class="required"><label for="Schedule' + $i + 'DurationHour">Dauer (Stunden)</label><div class="input time required"><select name="data[Schedule][' + $i + '][duration][hour]"  class="form-control form-control-date"  disabled="disabled"  id="Schedule' + $i + 'DurationHour"> <option value="00">0</option> <option value="01">1</option> <option value="02" selected="selected">2</option> <option value="03">3</option> <option value="04">4</option> <option value="05">5</option> <option value="06">6</option> <option value="07">7</option> <option value="08">8</option> <option value="09">9</option> <option value="10">10</option> <option value="11">11</option> <option value="12">12</option> <option value="13">13</option> <option value="14">14</option> <option value="15">15</option> <option value="16">16</option> <option value="17">17</option> <option value="18">18</option> <option value="19">19</option> <option value="20">20</option> <option value="21">21</option> <option value="22">22</option> <option value="23">23</option></select>:<select name="data[Schedule][' + $i + '][duration][min]"class="form-control form-control-date" disabled="disabled"id="Schedule' + $i + 'DurationMin"> <option value="00" selected="selected">00</option> <option value="15">15</option> <option value="30">30</option> <option value="45">45</option></select></div>  </div> </div> <div class="form-group">  <div><label for="Schedule' + $i + 'RepeatWeek">Wöchentlich wiederholen</label><div class="input select"><select name="data[Schedule][' + $i + '][repeat_week]" class="form-control" placeholder="1 = jede Woche wiederholen, 2= jede zweite usw." disabled="disabled" id="Schedule' + $i + 'RepeatWeek"> <option value="1" selected="selected">Jede Woche</option> <option value="2">Jede zweite Woche</option> <option value="3">Jede dritte Woche</option> <option value="4">Jede vierte Woche</option></select></div>  </div> </div></div><!-- Exception Schedule --><div class="tab-pane" id="except' + $i + '"> <div class="alert alert-warning alert-dismissable">  <button type="button" class="close" data-dismiss="alert" aria-hidden="true">?</button>  <strong>Achtung!</strong>Ausnahmeregeln werden in der aktuellen Version von Captility noch nicht  unterstützt. </div></div><hr/><button class="btn btn-default form-schedule-add pull-right" type="button"><span  class="glyphicon glyphicon-plus"></span>Weiterer Zeitplan</button><button class="btn btn-default form-schedule-remove" type="button" onclick=""><span  class="glyphicon glyphicon-remove"></span>Zeitplan entfernen</button>  </div> </div></div>';

        $('#ScheduleContainer').append($schedulesBoxText);

        $(this).updateScheduleRemoveState()


        //TODO: Remove redundant code:
        $('.pickDate').datepicker({


            weekStart: 1,
            language: "de",
            todayHighlight: true,
            autoclose: true,
            orientation: "top center",
            todayBtn: 'linked'
        });
    });

    // REMOVE SCHEDULES FROM FORM
    $('#ScheduleContainer').on('click', 'button.form-schedule-remove', function () {

        if ($('#ScheduleContainer button.form-schedule-remove').length > 1) {

            $(this).parents('.panel').first().remove();

            $(this).updateScheduleRemoveState()
        }
    });


});