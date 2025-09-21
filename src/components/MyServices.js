'use client';

import { motion } from 'framer-motion';
import { Code, Database, Globe, Palette, Smartphone, Zap } from 'lucide-react';

const MyServices = ({ services }) => {
  const getServiceIcon = (iconName) => {
    const iconProps = { className: "w-8 h-8" };
    switch (iconName?.toLowerCase()) {
      case 'code':
        return <Code {...iconProps} />;
      case 'palette':
        return <Palette {...iconProps} />;
      case 'smartphone':
        return <Smartphone {...iconProps} />;
      case 'globe':
        return <Globe {...iconProps} />;
      case 'database':
        return <Database {...iconProps} />;
      case 'zap':
        return <Zap {...iconProps} />;
      default:
        return <Code {...iconProps} />;
    }
  };

  if (!services || services.length === 0) {
    return null;
  }

  return (
    <section id="services" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
            My Services
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            I offer a comprehensive range of services to help bring your digital vision to life
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id || index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-200 dark:border-gray-700"
            >
              {/* Icon */}
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300">
                {getServiceIcon(service.icon)}
              </div>

              {/* Content */}
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {service.title}
              </h3>
              
              <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                {service.description}
              </p>

              {/* Features */}
              {service.features && service.features.length > 0 && (
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 flex-shrink-0"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              )}

              {/* Price */}
              {service.price && (
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">
                    {service.price}
                  </span>
                  {service.priceNote && (
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {service.priceNote}
                    </span>
                  )}
                </div>
              )}

              {/* Hover Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MyServices;
