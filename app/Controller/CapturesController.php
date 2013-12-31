<?php
App::uses('AppController', 'Controller');
App::uses('CakeTime', 'Utility');
/**
 * Captures Controller
 *
 * @property Capture $Capture
 * @property PaginatorComponent $Paginator
 */
class CapturesController extends AppController {

    /**
     * Components
     *
     * @var array
     */
    public $components = array('Paginator');

    /**
     * index method
     *
     * @return void
     */
    public function index() {
        $this->Capture->recursive = 0;
        $this->set('captures', $this->Paginator->paginate());
    }

    /**
     * view method
     *
     * @throws NotFoundException
     * @param string $id
     * @return void
     */
    public function view($id = null) {
        if (!$this->Capture->exists($id)) {
            throw new NotFoundException(__('Invalid capture'));
        }
        $options = array('conditions' => array('Capture.' . $this->Capture->primaryKey => $id));
        $this->set('capture', $this->Capture->find('first', $options));
    }

    /**
     * add method
     *
     * @return void
     */
    public function add() {


        if ($this->request->is('post')) {

            // EVENT
            $this->request->data['Event']['event_type_id'] = 1;
            $this->request->data['Event']['title'] = $this->request->data['Capture']['name'];
            $this->request->data['Event']['start'] = $this->request->data['Capture']['date'];

            // Endtime
            $date = $this->request->data['Capture']['date'];
            $endDateTime = new DateTime(
                $date['year'] . '-' . $date['month'] . '-' . $date['day'] . ' ' .
                    $date['hour'] . ':' . $date['min'] . ':' . '00');

            $endDateTime->modify('+2 hours');

            $endDate = $endDateTime->format('Y-m-d H:i:s');

            $this->request->data['Event']['end'] = $endDate;


            //$this->request->data['Event']['end']['hour'] = 2 + $this->request->data['Capture']['date']['hour'];
            $this->request->data['Event']['all_day'] = 0;
            $this->request->data['Event']['status'] = $this->request->data['Capture']['status'];
            $this->request->data['Event']['active'] = 1;


            // Create and Save Event for Capture
            if ($this->Capture->Event->save($this->request->data)) {


                $this->Session->setFlash(__('The event has been saved.'), 'default', array('class' => 'alert alert-success'));

                // Capture hasOne Event
                $this->request->data['Capture']['event_id'] = $this->Capture->Event->id;


                if ($this->Capture->save($this->request->data)) {

                    $this->Session->setFlash(__('The capture has been saved.'), 'default', array('class' => 'alert alert-success'));

                }
                else {

                    $this->Session->setFlash(__('The capture could not be saved. Please, try again.'), 'default', array('class' => 'alert alert-error'));
                }

                return $this->redirect(array('action' => 'index'));
            }
            else {
                $this->Session->setFlash(__('The event could not be saved. Please, try again.'), 'default', array('class' => 'alert alert-error'));

            }
        }
        $lectures = $this->Capture->Lecture->find('list');
        $users = $this->Capture->User->find('list');
        $events = $this->Capture->Event->find('list');
        $this->set(compact('lectures', 'users', 'events'));
    }

    /**
     * edit method
     *
     * @throws NotFoundException
     * @param string $id
     * @return void
     */
    public function edit($id = null) {
        if (!$this->Capture->exists($id)) {
            throw new NotFoundException(__('Invalid capture'));
        }
        if ($this->request->is(array('post', 'put'))) {
            if ($this->Capture->save($this->request->data)) {
                $this->Session->setFlash(__('The capture has been saved.'), 'default', array('class' => 'alert alert-success'));
                return $this->redirect(array('action' => 'index'));
            }
            else {
                $this->Session->setFlash(__('The capture could not be saved. Please, try again.'), 'default', array('class' => 'alert alert-error'));
            }
        }
        else {
            $options = array('conditions' => array('Capture.' . $this->Capture->primaryKey => $id));
            $this->request->data = $this->Capture->find('first', $options);
        }
        $lectures = $this->Capture->Lecture->find('list');
        $users = $this->Capture->User->find('list');
        $events = $this->Capture->Event->find('list');
        $this->set(compact('lectures', 'users', 'events'));
    }

    /**
     * delete method
     *
     * @throws NotFoundException
     * @param string $id
     * @return void
     */
    public function delete($id = null) {

        // Set active Capture record
        $this->Capture->id = $id;

        // Set active Event record
        $event = $this->Capture->findByCaptureId($id);
        $this->Capture->Event->id = $event['Event']['id'];

        if (!$this->Capture->exists()) {
            throw new NotFoundException(__('Invalid capture'));
        }
        $this->request->onlyAllow('post', 'delete');

        // Delete Capture
        if ($this->Capture->delete()) {
            $this->Session->setFlash(__('The capture has been deleted.'), 'default', array('class' => 'alert alert-success'));

            // Delete associated Event
            if ($this->Capture->Event->delete()) {
                $this->Session->setFlash(__('The event has been deleted.'), 'default', array('class' => 'alert alert-success'));
            }
            else {
                $this->Session->setFlash(__('The event could not be deleted. Please, try again.'), 'default', array('class' => 'alert alert-error'));
            }
        }
        else {
            $this->Session->setFlash(__('The capture could not be deleted. Please, try again.'), 'default', array('class' => 'alert alert-error'));
        }
        return $this->redirect(array('action' => 'index'));
    }
}
