// theme/antdTheme.js
const antdTheme = {
    token: {
        // Seed Token
        colorPrimary: '#F59E0B', // Tailwind's yellow-500
        colorInfo: '#F59E0B',   // Tailwind's yellow-500
        colorSuccess: '#22C55E', // Tailwind's green-500
        colorWarning: '#FBBF24', // Tailwind's amber-400
        colorError: '#EF4444',   // Tailwind's red-500
        borderRadius: 8,         // Tailwind's rounded-lg (default)
        wireframe: false,        // Disable wireframe mode if not needed
    },
    components: {
        Button: {
            colorPrimary: '#F59E0B', // Primary button background
            colorPrimaryHover: '#D97706', // Primary button hover background
            colorPrimaryActive: '#B45309', // Primary button active background
            colorTextBase: '#000000', // Default text color for primary buttons
            defaultBg: '#E5E7EB',    // Tailwind's gray-200 for default buttons
            defaultColor: '#1F2937', // Tailwind's gray-800 for default button text
            defaultBorderColor: '#D1D5DB', // Tailwind's gray-300 for default button border
            defaultHoverBg: '#D1D5DB', // Tailwind's gray-300 for default button hover
            defaultHoverBorderColor: '#9CA3AF', // Tailwind's gray-400 for default button hover border
            defaultHoverColor: '#1F2937', // Tailwind's gray-800 for default button hover text
            controlOutline: 'rgba(245, 158, 11, 0.2)', // Focus ring based on primary color
        },
        Input: {
            colorBgContainer: '#F3F4F6', // Tailwind's gray-100 for input background
            colorBorder: '#D1D5DB',     // Tailwind's gray-300 for input border
            controlOutline: 'rgba(245, 158, 11, 0.2)', // Focus ring
            activeBorderColor: '#F59E0B', // Active border color
            hoverBorderColor: '#FBBF24', // Hover border color
            colorText: '#1F2937',        // Default text color
            controlOutlineWidth: 2,      // Focus ring width
        },
        Select: {
            colorBgContainer: '#F3F4F6', // Tailwind's gray-100 for select background
            colorBorder: '#D1D5DB',     // Tailwind's gray-300 for select border
            controlOutline: 'rgba(245, 158, 11, 0.2)', // Focus ring
            activeBorderColor: '#F59E0B', // Active border color
            hoverBorderColor: '#FBBF24', // Hover border color
            colorText: '#1F2937',        // Default text color
            controlOutlineWidth: 2,      // Focus ring width
            optionSelectedBg: '#FEF3C7', // Tailwind's yellow-100 for selected option
            optionSelectedColor: '#F59E0B', // Tailwind's yellow-500 for selected option text
            optionHoverBg: '#E5E7EB', // Tailwind's gray-200 for option hover
        },
        Modal: {
            contentBg: '#FFFFFF', // White background for modal content
            headerBg: '#FFFFFF',  // White background for modal header
            titleColor: '#1F2937', // Dark gray for modal title
            titleFontSize: 20,
        },
        Card: {
            colorBgContainer: '#FFFFFF', // White background for Card
            colorBorder: '#E5E7EB',      // Tailwind's gray-200 for Card border
            headerBg: 'transparent',
        },
        Segmented: {
            itemSelectedBg: '#F59E0B', // Yellow-500 for selected item
            itemSelectedColor: '#000000', // Black text for selected item
            itemColor: '#1F2937',        // Dark gray for unselected item text
            itemHoverBg: '#E5E7EB',      // Tailwind's gray-200 for hover
        },
        // Add other components as needed, e.g., DatePicker, Table, etc.
    },
};

export default antdTheme;