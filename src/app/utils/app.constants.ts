/**
 * @Author Irfan Nasim
 * @since 07-Sep-17
 * @Description Application Constants
 */
export class AppConstants {

    public static ACCESS_TOKEN = 'access_token';
    public static EXPIRE_PASSWORD_TOKEN = 'expire_password_token';
    public static USER_BY_ROLE = '/user/role';
    public static FETCH_ALL_CLINICAL_DEPARTMENTS_URI = '/setting/department/';
    public static DELETE_CLINICAL_DEPARTMENTS_URI = '/setting/department/delete/';
    public static SEARCH_CLINICAL_DEPARTMENT_URL = '/setting/department/search/';
    public static SAVE_CLINICAL_DEPARTMENT_URL = '/setting/department/save';
    public static UPDATE_CLINICAL_DEPARTMENT_URL = '/setting/department/update';
    public static CREATE_USER_ENDPOINT = '/user/add';
    public static USER_SEARCH = '/user/search/';
    public static FETCH_ALL_USERS_URI = '/user/';
    public static FETCH_USER_BY_ID = '/user/get/';
    ////////////////////// Branch URLs ///////////////////////////////
    public static ADD_BRANCH = '/setting/branch/create';
    public static UPDATE_BRANCH = '/setting/branch/update/';
    public static DELETE_BRANCH_URI = '/setting/branch/delete/';
    public static BRANCHES_NAME = '/setting/branch/name';
    public static BRANCH_SEARCH = '/setting/branch/search/';
    public static FETCH_ALL_BRANCHES_URL = '/setting/branch/';
    public static FETCH_ALL_BRANCHES_ALL_URL = '/setting/branch/all';
    public static FETCH_BRANCHES_BY_ID = '/setting/branch/get/';

    ////////////////////// Patients Invoices ///////////////////////////////
    public static SAVE_INVOICE = '/invoice/saveInvoice';
    public static GET_INVOICE_ITEMS = '/invoice/getInvoiceItemsById/';
    public static INVOICE_CHECK_IN= '/invoice/generateInvoiceOnCheckIn/';


    ////////////////////// Cashier Desk ///////////////////////////////
    public static GET_All_INVOICES = '/cashier/getAllInvoices';
    public static FETCH_APPOINTMENTS_BY_INOVICE_ID = '/cashier/getAppointmentByInvoiceId/';
    public static SAVE_PAYMENT = '/cashier/savePayment';

    ////////////////////// ICD URLs ///////////////////////////////
    public static ICD_CODE = '/setting/icd/code';
    public static ICD_CODE_SAVE_URL = '/setting/icd/code/save';
    public static ICD_CODE_UPDATE_URL = '/setting/icd/code/update';
    public static ICD_CODES = '/setting/icd/codes/';
    public static ICD_CODES_ASSOCIATED_BY_VERSION_ID = '/setting/icd/codes/associated/?versionId=';
    public static ICD_CODE_DELETE_URL = '/setting/icd/code/delete?codeId=';
    public static ICD_CODE_SEARCH = '/setting/icd/code/search/';
    public static ICD_VERSION_SAVE_URL = '/setting/icd/version/save';
    public static ICD_VERSION_UPDATE_URL = '/setting/icd/version/update';
    public static ICD_VERSIONS = '/setting/icd/versions/';
    public static ICD_VERSION_DELETE_URL = '/setting/icd/version/delete?iCDVersionId=';
    public static ICD_VERSION_SEARCH = '/setting/icd/version/search/';
    public static ICD_CODE_VERSION_SAVE_URL = '/setting/icd/codeVersion/save';
    public static ICD_CODE_VERSIONS = '/setting/icd/codeVersions/';
    public static ICD_CODE_VERSION_DELETE_URL = '/setting/icd/codeVersion/delete?associateICDCVId=';
    public static ICD_CODE_VERSION_SEARCH = '/setting/icd/codeVersion/search/';
    public static ICD_VERSION_CODES_VERSION = '/setting/icd/version/codes/?versionId=';

    public static ROLE_ENDPOINT = '/user/auth/addRole';
    public static PERMISSION_ENDPOINT = '/user/auth/authorities';
    public static PERMISSION_BY_ROLE = '/user/auth/permission';
    public static ASSIGN_PERMISSIONS_TO_ROLES = '/user/auth/assignAuthorities';

    ////////////////////// Service Tax URLs ///////////////////////////////
    public static FETCH_ALL_TAX_URL = '/setting/tax/';
    public static SERVICE_TAX_SAVE_URL = '/setting/tax/save';
    public static SERVICE_TAX_DELETE_URL = '/setting/tax/delete?taxId=';
    public static SERVICE_TAX_UPDATE_URL = '/setting/tax/update';
    public static SERVICE_TAX_SEARCH_URL = '/setting/tax/search/';

    ////////////////////// Email Template URLs ///////////////////////////////
    public static EMAIL_TEMPLATE_FETCH_ALL_URL = '/setting/emailTemplate/';
    public static EMAIL_TEMPLATE_DELETE_URL = '/setting/emailTemplate/delete/?id=';
    public static EMAIL_TEMPLATE_SAVE_URL = '/setting/emailTemplate/save';
    public static EMAIL_TEMPLATE_EDIT_URL = '/setting/emailTemplate/get/';
    public static EMAIL_TEMPLATE_UPDATE_URL = '/setting/emailTemplate/update';
    public static EMAIL_TEMPLATE_SEARCH_URL = '/setting/emailTemplate/search/';

    ////////////////////// Medical Service URLs ///////////////////////////////
    public static FETCH_ALL_MEDICAL_SERVICES_URL = '/setting/medicalService/';
    public static SAVE_MEDICAL_SERVICES_URL = '/setting/medicalService/save';
    public static UPDATE_MEDICAL_SERVICES_URL = '/setting/medicalService/update';
    public static DELETE_MEDICAL_SERVICES_URL = '/setting/medicalService/delete?';
    public static FETCH_MEDICAL_SERVICES_BY_ID_URL = '/setting/medicalService/id/';
    public static MEDICAL_SERVICE_SEARCH = '/setting/medicalService/search/';
    public static FETCH_DEPARTMENTS_BY_MEDICAL_SERVICE_ID_URL = '/setting/medicalService/departments/';
    public static FETCH_BRANCHES_BY_MEDICAL_SERVICE_ID_URL = '/setting/medicalService/branches/';

    ////////////////////// Organization URLs ///////////////////////////////
    public static ORGANIZATION_CREATE_URL = '/setting/organization/create';
    public static TIMEZONE_FETCH_URL = '/setting/organization/timezone';
    public static FETCH_ALL_ORGANIZATION_URL_PAGINATED = '/setting/organization/';
    public static FETCH_ALL_ORGANIZATION_URL = '/setting/organization/all';
    public static FETCH_ORGANIZATION_BY_ID = '/setting/organization/get/';
    public static FETCH_ORG_ACCOUNT_URL = '/setting/organization/account';
    public static UPDATE_ORGANIZATION_URL = '/setting/organization/update/';

    ////////////////////// Patient URLs ///////////////////////////////
    public static FETCH_ALL_PATIENT_URL = '/patient/';
    public static PATIENT_DELETE_URI = '/patient/delete/';
    public static PATIENT_SAVE_URL = '/patient/save';
    public static PATIENT_FETCH_URL = '/patient/get/';
    public static PATIENT_UPDATE_URL = '/patient/update';
    public static SEARCH_ALL_PATIENT_URL = '/patient/search';
    public static GET_ALL_PATIENT_URL = '/patient/';
    public static UPLOAD_PATIENT_IMAGE_URL = '/patient/uploadProfileImg/';
    public static UPLOAD_PATIENT_FRONT_IMAGE_URL = '/patient/uploadImageFront/insurance/';
    public static UPLOAD_PATIENT_BACK_IMAGE_URL = '/patient/uploadImageBack/insurance/';
    public static PATIENT_PROBLEM_FETCH_URL = '/patient/history/problem/';
    public static PATIENT_PROBLEM_FETCH_STATUS_URL = '/patient/history/problem/status/';
    public static PATIENT_PROBLEM_SAVE_URL = '/patient/history/problem/save';
    public static PATIENT_PROBLEM_GET_URL = '/patient/history/problem/get?';
    public static PATIENT_PROBLEM_UPDATE_URL = '/patient/history/problem/update';
    public static PATIENT_PROBLEM_DELETE_URI = '/patient/history/problem/delete/';

    public static ALLERGY_SAVE_URL = '/patient/allergy/save';
    public static ALLERGY_PAGINATED_URL = '/patient/allergy/';
    public static ALLERGY_PAGINATED_STATUS_URL = '/patient/allergy/status/';
    public static ALLERGY_GET_URL = '/patient/allergy/get?';
    public static ALLERGY_UPDATE_URL = '/patient/allergy/update';
    public static ALLERGY_DELETE_URI = '/patient/allergy/delete/';

    //////////////////// Medication  ////////////////////////////////
    public static MEDICATION_SAVE_URL = '/patient/medication/save';
    public static MEDICATION_PAGINATED_URL = '/patient/medication/';
    public static MEDICATION_PAGINATED_STATUS_URL = '/patient/medication/status/';
    public static MEDICATION_GET_URL = '/patient/medication/get?';
    public static MEDICATION_UPDATE_URL = '/patient/medication/update';
    public static MEDICATION_DELETE_URI = '/patient/medication/delete/';
    public static PAGINATED_URL = '/patient/medication/paginated';

    //////////////////// DOCUMENT  ////////////////////////////////
    public static DOCUMENT_SAVE_URL = '/patient/document/save';
    public static DOCUMENT_PAGINATED_URL = '/patient/document/';
    public static DOCUMENT_GET_URL = '/patient/document/get?';
    public static DOCUMENT_UPDATE_URL = '/patient/document/update';
    public static DOCUMENT_DELETE_URI = '/patient/document/delete/';




    ////////////////////// Appointments URLs ///////////////////////////////
    public static FETCH_PAGINATED_APPOINTMENTS_URL = '/appointment/';
    public static CREATE_APPOINTMENT_URL = '/appointment/create';
    public static SEARCH_APPOINTMENT_URL = '/appointment/search/';
    public static FETCH_APPOINTMENTS_BY_ID = '/appointment/get/';
    public static UPDATE_APPOINTMENT = '/appointment/update/';
    public static DELETE_APPOINTMENT_URI = '/appointment/delete/';
    public static FETCH_APPOINTMENTS_URL = '/appointment/';

    ////////////////////// Dashboard URLs ///////////////////////////////
    public static FETCH_DASHBOARD_URL = '/dashboard/';
    public static CHANGE_APPT_STATUS = '/dashboard/changestatus/';

    ////////////////////// Patient History ///////////////////////////////
    public static FETCH_ALL_LABORDER_URL = '/patient/laborder/';
    public static FETCH_LABORDER_BY_ID = '/patient/laborder/get/';
    public static LAB_ORDER_UPDATE ='/patient/laborder/update/';
    public static LAB_ORDER_DELETE = '/patient/laborder/delete/';
    public static FETCH_ALL_ORDER_BY_PATIENT_URL = '/patient/laborder/order/';
    ///////////////////Family History//////////
    public static FAMILY_HISTORY_CREATE ='/patient/family/create';
    public static FETCH_ALL_FAMILY_HISTORY_URL = '/patient/family/';
    public static LAB_ORDER_CREATE ='/patient/laborder/create';
    public static UPDATE_FAMILY_HISTORY_URL = '/patient/family/update/';
    public static FAMILY_HISTORY_DELETE = '/patient/family/delete/';
    public static FETCH_ALL_FAMILY_HISTORY_BY_PATIENT_URL = '/patient/family/history/';
    ///////////////////////Smoke Status URLs//////////////////////////////
    public static SMOKE_STATUS_URL = '/patient/smokeStatus/addUpdate';
    public static SMOKE_STATUS_DEL_URL = '/patient/smokeStatus/delete/';
}