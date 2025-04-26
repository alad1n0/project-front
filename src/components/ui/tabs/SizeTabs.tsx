import React from "react";

const SizeTabs: React.FC<{
    sizes: { id: string, size: string }[];
    activeSize: string | null;
    onSizeChange: (size: string | null) => void;
}> = ({ sizes, activeSize, onSizeChange }) => {
    const handleSizeClick = (sizeId: string) => {
        if (activeSize === sizeId) {
            onSizeChange(null);
        } else {
            onSizeChange(sizeId);
        }
    };

    return (
        <div className="container_filter_tab">
            <div className="scrollable_tabs">
                {sizes.map((size) => (
                    <div
                        key={size.id}
                        className={`tab_item ${activeSize === size.id ? 'active' : ''}`}
                        onClick={() => handleSizeClick(size.id)}
                    >
                        {size.size}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SizeTabs;