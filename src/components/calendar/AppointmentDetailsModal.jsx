import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

const AppointmentDetailsModal = ({ isOpen, onClose, appointment }) => {
  if (!appointment) return null;

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Appointment Details
                </Dialog.Title>
                
                <div className="mt-4 space-y-3">
                  <div>
                    <span className="font-medium text-gray-700">Patient:</span>
                    <span className="ml-2">{appointment.patientName}</span>
                  </div>
                  
                  <div>
                    <span className="font-medium text-gray-700">Date:</span>
                    <span className="ml-2">{appointment.date}</span>
                  </div>
                  
                  <div>
                    <span className="font-medium text-gray-700">Time:</span>
                    <span className="ml-2">{appointment.time}</span>
                  </div>
                  
                  <div>
                    <span className="font-medium text-gray-700">Type:</span>
                    <span className="ml-2">{appointment.type}</span>
                  </div>
                  
                  <div>
                    <span className="font-medium text-gray-700">Created By:</span>
                    <span className="ml-2">{appointment.createdBy}</span>
                  </div>
                </div>

                <div className="mt-6">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={onClose}
                  >
                    Close
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default AppointmentDetailsModal;